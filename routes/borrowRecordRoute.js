const express = require('express');
const router = express.Router();

const borrowRecordController = require('../controllers/borrowRecordController');
router.post('/borrow', borrowRecordController.borrowBook);
router.post('/return', borrowRecordController.returnBook);
router.get('/', borrowRecordController.getAllBorrowRecords);
router.get('/active', borrowRecordController.getActiveBorrowRecords);
router.get('/member/:memberId', borrowRecordController.getMemberBorrowRecords);
router.get('/book/:bookId', borrowRecordController.getBookBorrowRecords);

module.exports = router;