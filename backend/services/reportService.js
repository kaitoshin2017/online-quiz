const PDFDocument = require('pdfkit');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Quiz = require('../models/Quiz');

class ReportService {
  constructor() {
    this.doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: 'System Report',
        Author: 'Quiz System Admin',
        Subject: 'System Statistics and Activity Report'
      }
    });
  }

  async generateReport(dateRange) {
    try {
      // Validate date range
      if (!dateRange || !['today', 'week', 'month', 'year'].includes(dateRange)) {
        throw new Error('Invalid date range');
      }

      // Get data based on date range
      const data = await this.getDataForDateRange(dateRange);
      
      // Create PDF
      const chunks = [];
      this.doc.on('data', chunk => chunks.push(chunk));
      
      // Add content to PDF
      this.addHeader(dateRange);
      this.addStatistics(data.statistics);
      this.addUserActivity(data.userActivity);
      this.addQuizActivity(data.quizActivity);
      
      // Finalize PDF
      this.doc.end();
      
      // Wait for all chunks to be collected
      return new Promise((resolve, reject) => {
        this.doc.on('end', () => {
          const pdfBuffer = Buffer.concat(chunks);
          resolve(pdfBuffer);
        });
        
        this.doc.on('error', (err) => {
          console.error('PDF generation error:', err);
          reject(new Error('Failed to generate PDF'));
        });
      });
    } catch (error) {
      console.error('Error in generateReport:', error);
      throw error;
    }
  }

  async getDataForDateRange(dateRange) {
    try {
      const now = new Date();
      let startDate;

      switch (dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = new Date(0); // All time
      }

      const [statistics, userActivity, quizActivity] = await Promise.all([
        this.getStatistics(startDate),
        this.getUserActivity(startDate),
        this.getQuizActivity(startDate)
      ]);

      return { statistics, userActivity, quizActivity };
    } catch (error) {
      console.error('Error in getDataForDateRange:', error);
      throw error;
    }
  }

  async getStatistics(startDate) {
    try {
      const [totalUsers, activeTeachers, activeStudents, totalQuizzes] = await Promise.all([
        User.countDocuments({ createdAt: { $gte: startDate } }),
        Teacher.countDocuments({ 
          status: 'active',
          createdAt: { $gte: startDate }
        }),
        Student.countDocuments({ 
          status: 'active',
          createdAt: { $gte: startDate }
        }),
        Quiz.countDocuments({ createdAt: { $gte: startDate } })
      ]);

      return {
        totalUsers,
        activeTeachers,
        activeStudents,
        totalQuizzes
      };
    } catch (error) {
      console.error('Error in getStatistics:', error);
      throw error;
    }
  }

  async getUserActivity(startDate) {
    try {
      return await User.find({ createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('firstName lastName role createdAt');
    } catch (error) {
      console.error('Error in getUserActivity:', error);
      throw error;
    }
  }

  async getQuizActivity(startDate) {
    try {
      return await Quiz.find({ createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 })
        .limit(10)
        .select('title description createdAt');
    } catch (error) {
      console.error('Error in getQuizActivity:', error);
      throw error;
    }
  }

  addHeader(dateRange) {
    this.doc
      .fontSize(25)
      .text('System Report', { align: 'center' })
      .moveDown()
      .fontSize(16)
      .text(`Date Range: ${dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}`, { align: 'center' })
      .moveDown()
      .fontSize(12)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' })
      .moveDown(2);
  }

  addStatistics(statistics) {
    this.doc
      .fontSize(18)
      .text('Statistics', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`Total Users: ${statistics.totalUsers}`)
      .text(`Active Teachers: ${statistics.activeTeachers}`)
      .text(`Active Students: ${statistics.activeStudents}`)
      .text(`Total Quizzes: ${statistics.totalQuizzes}`)
      .moveDown(2);
  }

  addUserActivity(userActivity) {
    this.doc
      .fontSize(18)
      .text('Recent User Activity', { underline: true })
      .moveDown()
      .fontSize(12);

    if (userActivity.length === 0) {
      this.doc.text('No user activity found for the selected period.');
    } else {
      userActivity.forEach(user => {
        this.doc
          .text(`${user.firstName} ${user.lastName} (${user.role})`)
          .text(`Joined: ${user.createdAt.toLocaleDateString()}`)
          .moveDown();
      });
    }
    this.doc.moveDown();
  }

  addQuizActivity(quizActivity) {
    this.doc
      .fontSize(18)
      .text('Recent Quiz Activity', { underline: true })
      .moveDown()
      .fontSize(12);

    if (quizActivity.length === 0) {
      this.doc.text('No quiz activity found for the selected period.');
    } else {
      quizActivity.forEach(quiz => {
        this.doc
          .text(`Title: ${quiz.title}`)
          .text(`Description: ${quiz.description}`)
          .text(`Created: ${quiz.createdAt.toLocaleDateString()}`)
          .moveDown();
      });
    }
  }
}

module.exports = new ReportService(); 