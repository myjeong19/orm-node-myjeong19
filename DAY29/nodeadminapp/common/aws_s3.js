const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// 파일명 기반 파일 확장자 조회 함수
function getExtention(fileName) {
  if (fileName == '') return '';
  var arrFileName = fileName.split('.');
  console.log(arrFileName);
  return arrFileName[arrFileName.length - 1];
}

// AWS S3 Upload Object
const upload = {
  getUpload: function (path) {
    var s3path = 'contents/';
    // 폴더가 없을 시, 폴더 생성

    if (path != '') s3path = path;

    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
    });
    // AWS S3 class에, S3_ACCESS_KEY_ID, S3_ACCESS_SECRET_KEY 전달

    // S3 전용 multer Package 이용해, 저장 처리
    const storage = multerS3({
      s3: s3,
      //   접근할 버킷 정보
      bucket: process.env.S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        var ext = getExtention(file.originalname);
        cb(null, {
          fieldName: file.fieldname,
          fileNewName: Date.now().toString() + '.' + ext,
          extention: '.' + ext,
        });
      },
      key: function (req, file, cb) {
        // 파일 업로드시, file 객체로 넘어옴
        cb(
          null,
          `uploads/${s3path}${Date.now()}.${getExtention(file.originalname)}`
          //   숫자.ext | S3에 저장될 파일명 | 최종 저장 경로 /uploads/contents/...
        );
      },
    });

    return multer({ storage: storage });
  },
};

exports.upload = upload;
