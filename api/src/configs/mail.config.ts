import env from "env-var"
import SMTPTransport from "nodemailer/lib/smtp-transport"

function getAuthMethod(): SMTPTransport.Options["auth"] {
  if (env.get("MAIL_AUTH_METHOD").asString() === "OAuth2") {
    return {
      type: "OAuth2",
      user: env.get("MAIL_USER").required().asString(),
      clientId: env.get("MAIL_CLIENT_ID").asString(),
      clientSecret: env.get("MAIL_CLIENT_SECRET").asString(),
      refreshToken: env.get("MAIL_REFRESH_TOKEN").asString(),
      accessToken: env.get("MAIL_ACCESS_TOKEN").asString(),
    }
  } else {
    return {
      type: "Login",
      user: env.get("MAIL_USER").required().asString(),
      pass: env.get("MAIL_USER_PASSWORD").required().asString(),
    }
  }
}

export function getTransporterConfig(): SMTPTransport.Options {
  const host = env.get("MAIL_HOST").required().asString()
  const port = env.get("MAIL_PORT").default(587).asInt()
  const secure = port === 465 ? true : false
  const auth = getAuthMethod()
  return { host, port, secure, auth }
}

export const getMailOrganisationName = () =>
  env.get("MAIL_ORGANISATION_NAME").asString() ||
  `Weather API <${env.get("MAIL_USER").required().asString()}>`
