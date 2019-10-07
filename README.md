# otpauth2oath

Binds a [FreeOTP+](https://play.google.com/store/apps/details?id=org.liberty.android.freeotpplus&hl=en) backup to [oathtool](https://www.nongnu.org/oath-toolkit/man-oathtool.html).

## Usage

### From Docker

```shell
docker run -ti -v /path/to/freeotp-backup.txt:/opt/otp/freeotp-backup.txt vidiben/otpauth2oath
```

### Manual

#### Prerequisites

* Node.js 12+
* [oathtool](https://www.nongnu.org/oath-toolkit/man-oathtool.html)

#### Install

```shell
git clone https://github.com/benoitvidis/otpauth2oath.git
cd otpauth2oath
npm install
```

#### Run

1. Export a backup from FreeOTP+ **in URI format**
2. `node path/to/otpauth2oath/index.js [/path/to/freeotp-backup.txt]`. The script will by default look for a `freeotp-backup.txt` file in the repository directory.

Example usage with nvm:

```shell
alias fotp='nvm run 12 /path/to/otpauth2oath/index.js'
```

