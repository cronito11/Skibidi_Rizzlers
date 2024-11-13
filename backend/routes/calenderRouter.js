import express from "express";
import calendarController from '../controller/calendarController.js'
const router = express();

//Create routes for categories
router.route('/api/calendar') 
.get(calendarController.list)
.post(calendarController.create)
.delete(calendarController.deleteAll)

router.route('/api/calendar/:author') 
.get(calendarController.read)
.put(calendarController.update) 
.delete(calendarController.remove)

router.param('author', calendarController.calendarByID) 
export default router;
