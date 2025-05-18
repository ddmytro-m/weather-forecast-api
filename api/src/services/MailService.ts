import { getMailOrganisationName, getTransporterConfig } from "../configs/mail.config"
import { Mail } from "../types/models/Mail"

import * as fs from "fs"
import Handlebars from "handlebars"
import { createTransport, Transporter } from "nodemailer"
import { resolve } from "path"

class MailService {
  private transporter: Transporter
  private emails: Map<string, string>

  private async loadEmails() {
    const dirPath = resolve(__dirname, "../../emails")

    const files = await fs.promises.readdir(dirPath)
    for (const fileName of files) {
      if (fileName.endsWith(".hbs") || fileName.endsWith(".handlebars")) {
        const key = fileName.match(/^(.*)\.(hbs|handlebars)$/)![1]

        const filePath = resolve(dirPath, fileName)
        const fileData = await fs.promises.readFile(filePath, { encoding: "utf-8" })

        this.emails.set(key, fileData)
      }
    }
  }

  private formatEmail(name: string, context: Record<string, unknown>) {
    const input = this.emails.get(name)
    if (!input) throw new Error(`Email '${name}' isn't present in the /api/emails directory`)

    const template = Handlebars.compile(input)
    return template(context)
  }

  constructor() {
    this.transporter = createTransport(getTransporterConfig())
    this.emails = new Map()
  }

  public async load() {
    await this.loadEmails()
    await this.transporter.verify()
  }

  public async sendMail(mail: Mail) {
    const html = this.formatEmail(mail.template, mail.context)
    await this.transporter.sendMail({
      from: getMailOrganisationName(),
      to: mail.email,
      subject: mail.subject,
      html,
    })
  }
}

export const mailService = new MailService()
