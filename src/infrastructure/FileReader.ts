import { Reader } from './Reader'
import { FileRecord } from './FileRecord'
import * as fs from 'fs'

export class FileReader implements Reader<FileRecord> {
  private fd: number
  private bytesRead: number = 0
  private charsRemaining: string = ''
  private chunkSize = 512

  constructor(fd: number) {
    this.fd = fd
  }

  read(): Promise<FileRecord[]> {
    return new Promise<FileRecord[]>((resolve, reject) => {
      const buffer: Buffer = Buffer.alloc(this.chunkSize)
      //fs.open(this.filename, 'r', (err: NodeJS.ErrnoException, fd: number): void => {
      //})
      const bytesRead: number = fs.readSync(this.fd, buffer, 0, this.chunkSize, this.bytesRead)

      if (bytesRead === 0) {
        if (this.charsRemaining !== '') {
          resolve([new FileRecord(this.charsRemaining)])
          this.charsRemaining = ''
        }
        return resolve(null)
      }
      const readString: string = this.charsRemaining + buffer.toString('utf8')
      this.bytesRead += bytesRead
      const readLines = readString.split('\n')
      this.charsRemaining = readLines.pop()
      const records = readLines.map(line => {
        return new FileRecord(readString)
      })
      resolve(records)
    })
  }
}
