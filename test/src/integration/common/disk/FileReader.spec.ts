import { FileReader } from '../../../../../src/common/disk/FileReader'
import * as fs from 'fs'
import { FileRecord } from '../../../../../src/common/disk/FileRecord'
import 'mocha'
import { expect } from 'chai'

describe('FileReader', () => {
  it('should provide class dependency', (done) => {
    fs.open('./test/resource/sample-market-records.csv', 'r', async (err: NodeJS.ErrnoException, fd: number) => {
      if (err) return done(err)

      const subjectUnderTest = new FileReader(fd)
      let row: FileRecord[] = await subjectUnderTest.read()
      expect(row.length).equals(2)
      const parsed = row[0].value.split(',')
      expect(parsed.length).equals(6)
      expect(parsed[0]).equals('1548759264240')
      expect(parsed[1]).equals('blockchain')
      expect(parsed[2]).equals('Bitcoin')
      expect(parsed[3]).equals('2971.81')
      expect(parsed[4]).equals('2971.81')
      expect(parsed[5]).equals('Euro')

      done()
    })
  })
})
