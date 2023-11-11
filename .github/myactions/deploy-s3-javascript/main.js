const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // github.getOctokit().auth => Zugriff auf REST-API
  // github.context.action => Zugriff auf Workflow

  // 2) Upload files
  const s3Uri = `s3://${bucket}`;
  
  // Angabe localFolder (also der distFolder) zu s3Folder (hier s3Uri)
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // core.notice('Hello from my custom JavaScript Action 2!');

  // http://gha-custom-action-hosting-jb.s3-website-us-east-1.amazonaws.com/
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl); // ::set-output
}

run();
