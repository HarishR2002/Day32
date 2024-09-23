// 1. Find all the topics taught in the month of October
db.topics.find({
    date: {
      $gte: ISODate("2020-10-01T00:00:00Z"),
      $lt: ISODate("2020-11-01T00:00:00Z")
    }
  });
  
  // 2. Find all the company drives which appeared between 15 Oct 2020 and 31 Oct 2020
  db.company_drives.find({
    start_date: { $gte: ISODate("2020-10-15T00:00:00Z") },
    end_date: { $lte: ISODate("2020-10-31T23:59:59Z") }
  });
  
  // 3. Find all the company drives and students who appeared for the placement
  db.company_drives.find({
    "students.status": "appeared"
  }, {
    company_name: 1,
    students: {
      $elemMatch: { status: "appeared" }
    }
  });
  
  // 4. Find the number of problems solved by the user in Codekata
  db.users.find({}, {
    name: 1,
    "codekata.problems_solved": 1
  });
  
  // 5. Find all mentors who have more than 15 mentees
  db.mentors.find({
    mentees_count: { $gt: 15 }
  });
  
  // 6. Find the number of users who were absent and did not submit tasks between 15 Oct 2020 and 31 Oct 2020
  db.users.find({
    "attendance.date": { 
      $gte: ISODate("2020-10-15T00:00:00Z"), 
      $lte: ISODate("2020-10-31T23:59:59Z")
    },
    "attendance.status": "absent",
    "tasks_submitted.submitted_date": {
      $not: { 
        $gte: ISODate("2020-10-15T00:00:00Z"), 
        $lte: ISODate("2020-10-31T23:59:59Z") 
      }
    }
  });
  