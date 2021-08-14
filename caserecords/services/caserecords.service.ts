import CaseRecordsDao from "../caserecords.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class CaseRecordsService implements CRUD {
  async filter(startDate: Date, endDate: Date, minCount: number, maxCount: number) {
    return CaseRecordsDao.filterCaseRecords(startDate, endDate, minCount, maxCount);
  }
}

export default new CaseRecordsService();