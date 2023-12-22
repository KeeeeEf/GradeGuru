// utils.js

import axios from 'axios';
import config from '../common/config';

export const fetchGradesForCourse = async (courseId, isTerm) => {
  try {
    const response = await axios.get(`${config.API}/activity/getactivity`, {
      params: {
        course_id: courseId,
        term: isTerm,
      },
    });

    const activityList = response.data.data;

    let grades = [];

    // Assume criteria is fetched from the server or provided as a parameter
    const criteria = await fetchCriteria(courseId);

    criteria.forEach((data) => {
      grades.push({
        score: 0,
        total: 0,
        type: data.type,
        percentage: data.percentage / 100,
      });
    });

    activityList.forEach((data) => {
      const index = grades.findIndex((grade) => grade.type === data.type);

      if (index !== -1) {
        grades[index].score += data.score;
        grades[index].total += data.total;
      }
    });

    const calculate = grades.map((data) => {
      if (data.total !== 0) {
        const result = (data.score / data.total) * data.percentage;
        return parseFloat(result.toFixed(4));
      } else {
        return 0;
      }
    });

    let summedGrade = calculate.reduce((accumulator, currentNumber) => {
      return accumulator + currentNumber;
    }, 0);

    const rounded = Math.floor(summedGrade * 100);

    let scale;

    if (rounded >= 95 && rounded <= 100) {
      scale = 1.0.toFixed(1);
    } else if (rounded <= 94 && rounded >= 75) {
      let subtract = 94 - rounded;
      let value = 1.0;

      for (let i = 0; i <= subtract; i++) {
        value += 0.1;
      }

      scale = parseFloat(value.toFixed(1));
    } else {
      scale = 5.0.toFixed(1);
    }

    return {
      activityList,
      criteria,
      grade: {
        scale,
        percentage: parseFloat((summedGrade * 100).toFixed(2)),
      },
    };
  } catch (err) {
    console.error('Error fetching grades:', err);
    return null;
  }
};

export const fetchCriteria = async (courseId) => {
  try {
    const response = await axios.get(`${config.API}/criteria/getcriteria?course_id=${courseId}`);
    return response.data.data;
  } catch (err) {
    console.error('Error fetching criteria:', err);
    return null;
  }
};

export const fetchCourseUnits = async (courseId) => {
    try {
      const response = await axios.get(`${config.API}/courses/getCourseUnits/${courseId}`);
      return response.data.units; // Assuming the units are provided in the response
    } catch (err) {
      console.error('Error fetching course units:', err);
      return null;
    }
  };
