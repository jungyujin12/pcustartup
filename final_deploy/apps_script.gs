/**
 * 배재대학교 창업 테스트 - Google Apps Script
 * JSONP 방식으로 CORS 없이 데이터 수신
 */

const SHEETS_CONFIG = {
  '유형추천_입문': [
    '타임스탬프','학과','학년',
    '유형결과','아이디어점수','실행력점수','네트워킹점수','분석력점수','테스트경로'
  ],
  '아이템추천_입문': [
    '타임스탬프','학과','학년',
    '아이템카테고리','추천아이템1','추천아이템2','추천아이템3','응답키워드','테스트경로'
  ],
  '유형및아이템_심화': [
    '타임스탬프','학과','학년',
    '유형결과','관심계열','관심분야','창업스타일',
    '추천아이템1','추천아이템2','추천아이템3','테스트경로'
  ],
  '유형추천_심화': [
    '타임스탬프','학과','학년',
    '유형결과','창의기획점수','실행력점수','네트워킹점수','분석력점수',
    '추천아이템1','추천아이템2','추천아이템3','테스트경로'
  ],
  '아이템추천_심화': [
    '타임스탬프','학과','학년',
    '아이템카테고리','추천아이템1','추천아이템2','추천아이템3','추천아이템4',
    '핵심키워드','테스트경로'
  ]
};

// ── GET 요청 처리 (JSONP) ────────────────────────
function doGet(e) {
  try {
    const callback = e.parameter.callback || 'callback';
    const rawData  = e.parameter.data;

    if (!rawData) {
      return jsonpResponse(callback, { result: 'error', message: 'no data' });
    }

    const data      = JSON.parse(decodeURIComponent(rawData));
    const sheetName = data.sheet;

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(sheetName);

    // 시트 없으면 자동 생성 + 헤더
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = SHEETS_CONFIG[sheetName] || ['타임스탬프','학과','학년','데이터'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#0052CC')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // 시트별 행 구성
    let row = [];
    if (sheetName === '유형추천_입문') {
      row = [
        data.timestamp, data.dept, data.grade,
        data.type_result,
        data.score_idea   || 0,
        data.score_exec   || 0,
        data.score_network|| 0,
        data.score_analysis||0,
        data.test_path    || ''
      ];
    } else if (sheetName === '아이템추천_입문') {
      row = [
        data.timestamp, data.dept, data.grade,
        data.item_category|| '',
        data.item_1||'', data.item_2||'', data.item_3||'',
        data.answers      || '',
        data.test_path    || ''
      ];
    } else if (sheetName === '유형및아이템_심화') {
      row = [
        data.timestamp, data.dept, data.grade,
        data.type_result  || '',
        data.field        || '',
        data.interest     || '',
        data.style        || '',
        data.item_1||'', data.item_2||'', data.item_3||'',
        data.test_path    || ''
      ];
    } else if (sheetName === '유형추천_심화') {
      row = [
        data.timestamp, data.dept, data.grade,
        data.type_result  || '',
        data.score_creative||0,
        data.score_exec   ||0,
        data.score_network||0,
        data.score_analysis||0,
        data.item_1||'', data.item_2||'', data.item_3||'',
        data.test_path    || ''
      ];
    } else if (sheetName === '아이템추천_심화') {
      row = [
        data.timestamp, data.dept, data.grade,
        data.item_category|| '',
        data.item_1||'', data.item_2||'', data.item_3||'', data.item_4||'',
        data.top_keyword  || '',
        data.test_path    || ''
      ];
    } else {
      row = [data.timestamp, data.dept, data.grade, JSON.stringify(data)];
    }

    sheet.appendRow(row);

    return jsonpResponse(callback, { result: 'success' });

  } catch (err) {
    const callback = (e.parameter && e.parameter.callback) || 'callback';
    return jsonpResponse(callback, { result: 'error', message: err.toString() });
  }
}

function jsonpResponse(callback, obj) {
  const json = JSON.stringify(obj);
  return ContentService
    .createTextOutput(`${callback}(${json})`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// ── POST (하위 호환) ────────────────────────────
function doPost(e) {
  return doGet(e);
}
