import mongooseService from '../common/services/mongoose.service';

class CaseRecordsDao {
  Schema = mongooseService.getMongoose().Schema;

  caseRecordSchema = new this.Schema({
    _id: String,
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String
  }, { id: false });

  CaseRecord = mongooseService.getMongoose().model('records', this.caseRecordSchema);

  constructor() {
  }

  async filterCaseRecords(startDate: Date, endDate: Date, minCount: number, maxCount: number) {
    return this.CaseRecord.aggregate([
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: { $sum: "$counts" }
        }
      },
      {
        $match: {
          totalCount: {
            $gte: minCount,
            $lte: maxCount
          },
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      }
    ]);
  }
}

export default new CaseRecordsDao;