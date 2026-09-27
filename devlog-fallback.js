/////// 2026-08-31 /kyg 노션형 일자 상세 (학교명 없음)
window.DEVLOG_FALLBACK = {
  "source": "fallback",
  "updatedAt": "2026-08-31",
  "months": [
    {
      "title": "2026년 8월",
      "days": [
        {
          "date": "2026-08-27 (목)",
          "summary": "보조작업장 3년, 증분 컴파일, 일괄징수결의 조사 (육아휴직 제외)",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>742947b</code> 회계-보조장3개년도예산가능하게함 (15:25)<br>커밋 <code>25a9806</code> 신_육아휴직수당개정 (20:31)</div></div><h2>1. 회계 — 보조작업장 예결산 3개 학년도</h2><ul><li>파일: <code>src/AccMain.java</code></li><li>reset() 에서 보조작업장(acc 폴더가 아님) 예결산만 미래 학년도를 3년까지 허용. 본회계(acc) 는 기존대로 1년.</li><li>주석: 2026-08-27 /kyg 보조작업장 예결산은 3년 후 학년도까지 허용</li></ul><h2>2. 빌드 — 증분 컴파일 스크립트</h2><ul><li>요청: <code>scripts/build-jdk16-2.ps1</code> 실행 시 수정한 <code>.java</code>만 컴파일되길 원함.</li><li>조치: Maven에 증분 컴파일 옵션을 붙여 수정분만 컴파일.</li><li>평소: <code>scripts/build-jdk16-2.ps1</code> / 전체 재컴파일: <code>scripts/build-jdk16-2.ps1 -Clean</code></li></ul><h2>3. 급여 — 육아휴직수당 2025.1.3. 개정 반영</h2><ul><li>커밋: <code>25a9806</code> 신_육아휴직수당개정</li><li>수정 파일: <code>Pay_육아휴직.java</code>, <code>PayPartial.java</code>, <code>PayMasterInfo3.java</code>, <code>PayAccountProcess.java</code>, <code>StepSettle.java</code>, <code>Pay_육아휴직_1.java</code>, <code>Pay_아빠육아휴직.java</code></li></ul><h3>3-1. 작업 내용</h3><p>계산은 <code>Pay_육아휴직.java</code> 하나에서 처리. 콤보에 4종 추가.</p><table><thead><tr><th>번호</th><th>구분값</th><th>상한</th><th>지급기간</th></tr></thead><tbody><tr><td>13</td><td>육아휴직</td><td>제1항 일반</td><td>12개월</td></tr><tr><td>27</td><td>육아휴직(부부)</td><td>제2항 제1호</td><td>12개월</td></tr><tr><td>28</td><td>육아휴직(부부18)</td><td>제2항 제1호</td><td>18개월</td></tr><tr><td>29</td><td>육아휴직(한부모)</td><td>제2항 제2호</td><td>18개월</td></tr><tr><td>30</td><td>육아휴직(18개월)</td><td>제1항 일반</td><td>18개월</td></tr><tr><td>26</td><td>육아휴직_1</td><td>미사용 (콤보 숨김)</td><td>계산 안 탐</td></tr></tbody></table><h3>3-3. 이슈</h3><div class=\"devlog-callout red\"><span class=\"devlog-callout-icon\">🔧</span><div class=\"devlog-callout-body\">이번에 고친 것: 적용 기준을 개시일에서 급여지급월 202501 이상으로 변경(부칙 제3조).</div></div><div class=\"devlog-callout yellow\"><span class=\"devlog-callout-icon\">⏳</span><div class=\"devlog-callout-body\">미반영: 부칙 제5조(18개월 잔여 차감), 단축수당 합산 18개월 한도, 30일 요건 체크.</div></div><h2>4. 수납 — 일괄징수결의 무반응 조사 (수정 미진행)</h2><ul><li>원인: <code>RctDecideCLModel.doDecide()</code> 의 테스트 코드.</li><li>후속: 해당 구간 삭제. 아직 수정·커밋 안 함.</li></ul>"
        },
        {
          "date": "2026-08-21 (금)",
          "summary": "신주민번호 체계 (급여+ 연말정산)",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>72ae8bd</code> 주민번호체계변경-급여만반영</div></div><h2>작업</h2><ul><li>파일: <code>src/Util.java</code>, <code>src/PayMasterInfo.java</code>, <code>src/PayFamilyModel.java</code>, <code>src/TaxAccount.java</code>, <code>src/TaxExcelReading.java</code>, <code>src/TaxFamilyModel.java</code>, <code>src/Tax소득공제신고서_부양가족모델.java</code></li><li>급여 마스터·부양가족 + 연말정산(Tax) 빨간 표시/점검 문구까지 연결.</li></ul><h2>규정·체계</h2><ul><li>문서: <code>docs/새로운주민번호체계.md</code></li><li><strong>2020-10-05 이후</strong> 신규 발급분은 뒤자리 성별코드 1자리만 의미 있고 나머지 6자리는 난수 → <strong>mod 11 체크디지트가 성립하지 않음</strong>.</li><li>판단 기준은 생년월일 ≥ 2020-10-05 이고 성별코드 G가 3 또는 4 일 때 체크디지트 생략.</li></ul><h2>이슈</h2><ul><li>2000년대생 + 뒤자리 3/4 부양가족이 주민번호 오류(빨간 글씨)로 몰림.</li><li>Pay+Tax 호출부를 신체계 메서드로 교체.</li></ul>"
        },
        {
          "date": "2026-08-13 (목)",
          "summary": "홈페이지 index.html 수정본 백업",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>49efddd</code> 홈페이지_수정본_index.html</div></div><ul><li>파일: <code>scripts/html-backup/index.html</code>, <code>scripts/html-backup/haegyo_minimal_hero.jpg</code></li><li>홈페이지 수정본을 저장소 <code>scripts/html-backup</code> 에 보관.</li></ul>"
        },
        {
          "date": "2026-08-12 (수)",
          "summary": "기존결의서→신규 복사 후 일자 일괄입력 시 중복 생성 수정",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>b816bb3</code> 회계-기존결의서에서 신규결의서로 복사기능 에러수정-260812</div></div><h2>작업</h2><ul><li>파일: <code>src/SlipProcess.java</code></li><li>기존결의서 → 신규결의서 복사 후 「일자선택 일괄입력」하면 결의서가 하나 더 생기는 오류.</li></ul><h2>이슈</h2><ul><li>복사 직후 일자 없이 <code>write(N, copy)</code> 로 저장되는데 <code>newEntry</code>가 꺼지지 않음.</li><li>이후 일자 일괄입력의 <code>m.write()</code>가 <code>newEntry</code> 때문에 다음 번호로 한 번 더 INSERT.</li><li>수정 범위: <code>SlipProcess</code>의 신규 복사 분기만. 복사 후 <code>m.newEntry = (no == m.getNewNo())</code> 로 맞춤.</li></ul>"
        },
        {
          "date": "2026-08-11 (화)",
          "summary": "bak 추적 제외, 현재월 이후 삭제 팝업, Cloudflare+curl 업데이트",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>9267390</code> bak추적제외<br>커밋 <code>147e6fe</code> 현재월이후삭제_팝업창수정<br>커밋 <code>59ac883</code> cloudflare로 서버변경+curl 방식추가</div></div><h2>1. bak 추적 제외</h2><ul><li>Git에 올라가 있던 <code>src/*.bak.1</code> 등 백업 파일을 저장소에서 제거.</li></ul><h2>2. 현재월 이후 삭제 팝업</h2><ul><li>파일: <code>src/PayAccountAll2.java</code>, <code>src/PayView.java</code></li><li>현재월 이후 자료 삭제 확인 창이 불편하거나 안 맞던 부분을 수정.</li></ul><h2>3. 업데이트 서버 Cloudflare + curl</h2><ul><li>파일: <code>src/ManifestUpdate.java</code>, <code>src/Registry.java</code></li><li>업데이트 수신을 Cloudflare 경로로 바꾸고, 기존 방식 외에 curl 다운로드를 추가.</li></ul>"
        },
        {
          "date": "2026-08-10 (월)",
          "summary": "질병휴직 1년초과~2년 이하 겹치는 구간 일할 수정",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>04a0a8d</code> 질병휴직_1년초과2년이하겹치는구간_수정</div></div><h2>작업</h2><ul><li>파일: <code>src/PayPartial.java</code>, <code>src/PayAccount.java</code>, <code>src/DateUtil.java</code>, <code>src/PeriodTierCalculator.java</code></li><li>질병휴직 70%→50% 전환월을 역(曆) 기준으로 일할 합산. 2년 초과 시 알림 1회 + 무급(0%).</li></ul><h2>규정</h2><ul><li>기간: 개시일 기준 달력 1년, 전일까지 70%. 민법 제160조 역에 의한 계산.</li><li>전환월 산식: 70% 일수·50% 일수를 각각 일한 뒤 합산.</li><li>2년(730일) 초과 구간은 무급.</li></ul><h2>이슈</h2><ul><li>원인: <code>get질병휴직일별지급율</code>이 공식 배열(<code>rates</code>)이 없으면 누적 로직을 건너뜀.</li><li>일별 지급율 버킷 → <code>calculateTheMonth</code> 합산 구조를 역 기준으로 수정.</li></ul>"
        },
        {
          "date": "2026-08-06 (목)",
          "summary": "재정결함 따라하기 HTML, 전직원가계산 일괄삭제",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>b503287</code> 재정결함따라하기-html수정<br>커밋 <code>48d0353</code> 조회수정의 일괄삭제 기능을 전직원가계산에 추가함</div></div><h2>1. 재정결함 따라하기 HTML</h2><ul><li>파일: <code>src/HTMLViewer.java</code>, <code>src/HtmlPanel.java</code>, <code>src/Subsidy.java</code></li><li>재정결함 안내 HTML 표시가 깨지거나 따라하기 화면이 불편하던 부분을 수정.</li></ul><h2>2. 전직원 가계산에 일괄삭제</h2><ul><li>파일: <code>src/PayAccountAll2.java</code>, <code>src/PayView.java</code></li><li>조회수정에만 있던 일괄삭제를 전직원 가계산 화면에도 넣음.</li></ul>"
        },
        {
          "date": "2026-08-03 (월)",
          "summary": "지출결의서 양식, 수입→지출 복사 메시지, 회계 간 결의서 복사, 프로그램별 공지 팝업",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>7a441ed</code> 지출결의서물품등기일자제거와양식가독성개선<br>커밋 <code>3647503</code> 수입결의서에서 지출결의서로 복사할때 메세지창 나오게 해결<br>커밋 <code>b5306b0</code> 서로다른회계간 동일결의서복사기능 수정<br>커밋 <code>fd1d4e5</code> 각각의 프로그램별 공지사항 업데이트</div></div><h2>1. 지출결의서 양식</h2><ul><li>파일: <code>src/SlipOutgoPP5.java</code>, <code>src/SlipOutgoPP5_영문.java</code></li><li>물품 등기일자 칸을 빼고 양식 가독성을 맞춤.</li></ul><h2>2. 수입결의서 → 지출결의서 복사 메시지</h2><ul><li>파일: <code>src/SlipProcess.java</code></li><li>이슈: 수입에서 지출로 복사할 때 안내 창이 안 떴음. 복사 시 메시지 창이 나오도록 수정.</li></ul><h2>3. 서로 다른 회계 간 동일 결의서 복사</h2><ul><li>파일: <code>src/AccItem.java</code>, <code>src/SlipProcess.java</code>, <code>src/결의서복사.java</code></li><li>이슈: 회계가 다를 때 같은 결의서를 복사하면 깨지거나 잘못 붙었음.</li></ul><h2>4. 프로그램별 공지사항 팝업</h2><ul><li>파일: <code>src/NoticePopup.java</code> (신규), <code>src/PayMain.java</code>, <code>src/AccMain.java</code>, <code>src/RctMain.java</code>, <code>src/InvMain.java</code>, <code>src/CerMain.java</code>, <code>scripts/generate-notice-manifest.ps1</code></li><li>기존 <code>OnPopup</code> 소스가 없어 동작하지 않던 공지를 <code>NoticePopup</code>으로 교체. HTML 텍스트+이미지, 다시 보지 않기.</li><li>공지 파일: <code>c:/kova/notices/</code> 의 common/pay/acc/rct 등. 다시 보지 않기 기록: <code>c:/kova/userN/notice_shown</code>.</li><li>InvMain·CerMain에도 공지 추가.</li></ul>"
        }
      ]
    },
    {
      "title": "2026년 7월",
      "days": [
        {
          "date": "2026-07-30 (목)",
          "summary": "신분변동구분 오류 메시지, 간이지급명세서 복붙",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>ca87457</code> 급여가계산시 신분변동구분없을때 메세지수정<br>커밋 <code>ee88a7d</code> 근로소득간이지급명세서_복붙추가</div></div><h2>1. 가계산 — 신분변동구분 오류 메시지</h2><ul><li>파일: <code>src/PayPartial.java</code></li><li>이슈: 원부 신분변동 구분값이 콤보 범위 밖이면 가계산이 그냥 진행되며 나중에 깨지거나 안내가 없음.</li><li>수정: 슬롯 1·2의 구분값을 검사. 범위 밖이면 「신분변동 오류」 창을 띄우고 가계산을 중단.</li></ul><h2>2. 근로소득 간이지급명세서 복사·붙여넣기</h2><ul><li>파일: <code>src/Pay간이지급명세_근로.java</code>, <code>src/Pay간이지급명세_근로_모델.java</code></li><li>간이지급명세서 화면에 복사·붙여넣기를 넣음.</li></ul>"
        },
        {
          "date": "2026-07-27 (월)",
          "summary": "직종(NDUTY) 슬롯 30→40",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>bb73692</code> Update NDUTY constant to 40</div></div><h2>작업</h2><ul><li>파일: <code>src/Duty.java</code>, <code>src/PayBasic.java</code>, <code>src/PayGroupInfo.java</code>, <code>src/PayItems.java</code></li><li>직종(직무) 슬롯 상수 <code>NDUTY</code> 를 30에서 <strong>40</strong>으로 늘림.</li></ul><h2>이슈</h2><ul><li>직종이 30개를 넘는 경우 배열이 부족함. 레이아웃 <code>*NDUTY</code> 와 배열 크기를 같이 맞춤.</li></ul>"
        },
        {
          "date": "2026-07-13 (월)",
          "summary": "주민세=지방소득세, 원천징수필확인서 직인",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>2cee6f8</code> 급여-주민세=지방소득세 수정 완료<br>커밋 <code>d326b3a</code> 급여-근로소득원천징수필확인서-직인추가</div></div><h2>1. 주민세 = 지방소득세</h2><ul><li>파일: <code>src/PayBasic.java</code>, <code>src/TaxAccount.java</code></li><li>이슈: 수당/공제 항목명은 「주민세」인데, 연말정산 화면은 「지방소득세」로 찾아 항목을 못 찾음.</li><li>수정: <code>PayBasic.getAliasName</code> 에서 주민세↔지방소득세 별칭.</li></ul><h2>규정</h2><ul><li>지방세법 개정으로 소득할 주민세가 <strong>지방소득세</strong>로 명칭이 바뀜. 프로그램은 두 이름을 같은 항목으로 취급.</li></ul><h2>2. 근로소득 원천징수필확인서 직인</h2><ul><li>파일: <code>src/TaxCertifP3.java</code>, <code>src/ImagePrinter.java</code></li><li>원천징수필확인서 출력에 직인을 찍도록 함.</li></ul>"
        },
        {
          "date": "2026-07-11 (토)",
          "summary": "현금출납부 PDF, 억단위 입력, 일일마감 바로출력, 복수세목 통계",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>db044f9</code> 회계-현금출납부(목별)출력-PDF변환기능<br>커밋 <code>ab69cf7</code> 급여-조회수정입력금액 1억이상 포함<br>커밋 <code>2bec282</code> 급여-1억이상 입력가능 수정<br>커밋 <code>83eda86</code> 회계-일일업무마감-바로출력수정<br>커밋 <code>e457007</code> 회계-복수세목의 월별 납부자별 통계출력</div></div><h2>1. 현금출납부(목별) PDF</h2><ul><li>파일: <code>src/AccCashBookP.java</code>, <code>src/ReportViewer.java</code></li><li>목별 현금출납부 출력에 PDF 변환을 넣음.</li></ul><h2>2. 조회수정 억 단위 입력</h2><ul><li>파일: <code>src/PayDetail.java</code></li><li>이슈: 금액 칸 상한이 작아 억 단위를 넣지 못함. 허용 범위를 올려 1억대 입력이 되게 함.</li></ul><h2>3. 일일업무마감 바로출력</h2><ul><li>파일: <code>src/SlipPrintProcess.java</code></li><li>일일업무마감에서 지출결의서를 바로 출력하면 가로로 나오던 방향을 수정.</li></ul><h2>4. 복수세목 월별 납부자별 통계</h2><ul><li>파일: <code>src/AccStatP4.java</code>(신규), <code>src/AccFormLayout.java</code>, <code>src/AccFormBuffer.java</code>, <code>src/AccStatSelection.java</code></li><li>세목이 여러 개인 경우 월별·납부자별 통계를 출력.</li></ul>"
        },
        {
          "date": "2026-07-09 (목)",
          "summary": "업데이트 note 한글, 일계표 확인창, 파일 사이즈 비교",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>456c1e1</code> 업데이트note파일 한글꺠짐 수정<br>커밋 <code>2a3ffca</code> 일계표-확인창크기확장<br>커밋 <code>941b499</code> 업데이트서버-사이즈비교포함<br>커밋 <code>be34ac9</code> 일계표-확인창 크기확장2</div></div><h2>1. 업데이트 note 한글 깨짐</h2><ul><li>파일: <code>scripts/publish-update-kgi.ps1</code>, <code>.editorconfig</code></li><li>notes HTML을 올릴 때 한글이 깨지던 인코딩을 맞춤.</li></ul><h2>2. 일계표 확인 창 크기</h2><ul><li>파일: <code>src/Title.java</code></li><li>확인 창이 작아 문구가 잘리던 것을 두 차례 키움.</li></ul><h2>3. 업데이트 파일 사이즈 비교</h2><ul><li>파일: <code>src/ManifestUpdate.java</code></li><li>받을 파일과 로컬 파일 크기를 비교해, 같은 파일이면 다시 받지 않도록 함.</li></ul>"
        },
        {
          "date": "2026-07-08 (수)",
          "summary": "TODO 관리, 결의서 이전화면 복구",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>f543070</code> TODO관리도구등록<br>커밋 <code>6d33686</code> 회계-결의서 이전화면으로 복구</div></div><h2>1. TODO 관리</h2><ul><li>파일: <code>TODO.md</code>, <code>.cursor/rules/todo-management.mdc</code></li><li>고객 수정요청을 대기중/진행중/완료로 추적하는 규칙을 등록.</li></ul><h2>2. 결의서 이전화면 복구</h2><ul><li>파일: <code>src/SlipProcess.java</code>, <code>src/SlipLayoutHelper.java</code>, <code>src/UiScale.java</code>, <code>src/VTablePanel.java</code> 등</li><li>7/4~7/5에 키운 결의 화면을 <strong>이전 레이아웃으로 되돌림</strong>.</li></ul><h2>이슈</h2><ul><li>확대 화면이 현장에서 불편해 롤백.</li></ul>"
        },
        {
          "date": "2026-07-07 (화)",
          "summary": "수입일계표 엑셀·지출일괄출력, 컴파일 오류, Manifest 업데이트",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>c7b487f</code> 회계_수입일계표_엑셀출력선택_지출결의서일괄출력추가<br>커밋 <code>d76222d</code> 1.6-mvn compile 오류 수정<br>커밋 <code>9b725d2</code> 업데이트을Manifest.json/Files폴더/notes폴더방식으로변경<br>커밋 <code>5269589</code> Merge branch into master<br>커밋 <code>df7e59a</code> 새로운업데이트운영방법</div></div><h2>1. 수입일계표 엑셀 출력 + 지출결의서 일괄출력</h2><ul><li>파일: <code>src/AccDailyProcess.java</code>, <code>src/AccDailyReport2.java</code>, <code>src/AccIncomeReport.java</code>, <code>src/ReportViewer2.java</code>, <code>src/SlipPrintProcess.java</code></li><li>수입일계표에 엑셀 출력 선택, 지출결의서 일괄출력을 넣음.</li></ul><h2>2. JDK 1.6 Maven 컴파일 오류</h2><ul><li>파일: <code>src/AccFormulaParser.java</code>, <code>src/Acc화폐.java</code>, <code>src/SlipProcess.java</code>, <code>src/TaxCertifP3.java</code></li><li>1.6 컴파일이 깨지던 구문을 맞춤.</li></ul><h2>3. 업데이트 방식 변경 (Manifest / files / notes)</h2><ul><li>파일: <code>src/ManifestUpdate.java</code>, <code>src/Registry.java</code>, <code>src/UpdateProcess.java</code></li><li>기존 단일 note 방식에서 <code>manifest.json</code> + <code>files/</code> + <code>notes/</code> HTML 공지 구조로 바꿈.</li></ul>"
        },
        {
          "date": "2026-07-05 (일)",
          "summary": "결의화면 키우기 최종",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>15ff349</code> 회계_결의화면키우기_최종</div></div><h2>작업</h2><ul><li>파일: <code>src/SlipLayoutHelper.java</code>, <code>src/SlipProcess.java</code>, <code>src/SlipInfoPanel.java</code>, <code>src/SlipCodeSelection.java</code>, <code>src/VTablePanel.java</code>, <code>src/Html.java</code> 등</li><li>전날 결의화면 확대를 이어서 최종 맞춤.</li></ul><h2>이슈</h2><ul><li>7/8에 결의서 이전화면으로 복구하면서 이 확대분도 함께 되돌아감.</li></ul>"
        },
        {
          "date": "2026-07-04 (토)",
          "summary": "target 추적 제거, 계정과목 목간정렬, 결의화면 확대",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>dc665e7</code> 빌드 산출물 추적 제거 및 급여/메인 UI 수정<br>커밋 <code>d8d4d65</code> 회계_계정과목_목간정렬<br>커밋 <code>834c198</code> 회계_결의서크기,계정과목정렬<br>커밋 <code>8198f77</code> 회계_결의화면확대모두적용함(수입에서반납까지)</div></div><h2>1. 빌드 산출물 추적 제거 + 급여/메인 UI</h2><ul><li>파일: <code>.gitignore</code>, <code>src/Main.java</code>, <code>src/PayMain.java</code>, <code>src/PayMenuPanel.java</code> 등</li><li>Git에서 <code>target/</code> 을 빼고, 급여 메인·메뉴 화면을 수정.</li></ul><h2>2. 계정과목 목 간 정렬</h2><ul><li>파일: <code>src/AccCodeModel.java</code>, <code>src/AccItemInfo.java</code>, <code>src/AccItemModel.java</code></li><li>계정과목을 목(目) 단위로 정렬되게 함.</li></ul><h2>3. 결의서 화면 크기·계정과목 정렬</h2><ul><li>파일: <code>src/SlipLayoutHelper.java</code>(신규), <code>src/UiScale.java</code>(신규), <code>src/SlipProcess.java</code> 등</li><li>결의서 화면을 키우고 계정과목 정렬을 맞춤.</li></ul><h2>4. 결의화면 확대 ? 수입부터 반납까지</h2><ul><li>파일: <code>src/SlipIncome.java</code>, <code>src/SlipOutgo.java</code>, <code>src/SlipPay.java</code>, <code>src/SlipPayback.java</code></li><li>수입·지출·지급·반납 결의 화면에 확대를 모두 적용.</li></ul><h2>이슈</h2><ul><li>화면이 커진 뒤 현장 사용이 불편하다는 판단으로, 7/8에서 이전화면으로 되돌림.</li></ul>"
        },
        {
          "date": "2026-07-03 (금)",
          "summary": "급여 초기화면 변경, Cursor 규칙 등록",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>6cce791</code> 급여초기화면변경</div></div><h2>작업</h2><ul><li>파일: <code>src/mem.java</code>, <code>src/PayMain</code>, <code>src/PayMenuPanel</code></li><li>급여 프로그램 첫 화면(메뉴)을 바꿈.</li><li>Cursor 규칙을 처음 등록: 수정 전 사용자 백업, <code>/kyg</code> 날짜 주석, <code>mvn compile</code> 자동 실행 금지.</li></ul>"
        },
        {
          "date": "2026-07-01 (수)",
          "summary": "Cursor 저장소 초기 커밋",
          "html": "<div class=\"devlog-callout\"><span class=\"devlog-callout-icon\">✅</span><div class=\"devlog-callout-body\">커밋 <code>be9c22a</code> Initial commit (Cursor)<br>커밋 <code>3f8abdc</code> Initial commit (Cursor)</div></div><h2>작업</h2><ul><li>Cursor 작업용 Git 저장소를 처음 올렸다.</li><li><code>be9c22a</code>: 전체 소스(<code>src/</code>), <code>pom.xml</code>, local-libs 포함.</li><li><code>3f8abdc</code>: <code>src/.gitignore</code> 만 추가.</li></ul><h2>이슈</h2><ul><li>이후 7/4 <code>dc665e7</code> 에서 <code>target/</code> 등 빌드 산출물 추적을 제거함.</li></ul>"
        }
      ]
    }
  ]
};
