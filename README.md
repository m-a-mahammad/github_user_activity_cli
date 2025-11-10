📊 GitHub Repository Activity CLI
أداة بسيطة مبنية بـ Node.js لعرض وتتبع النشاطات (Events) الخاصة بأي مستودع على GitHub، مع إمكانية تصفية نوع الأحداث وتخزينها محليًا في ملف github_activity.json.

🚀 الميزات
جلب أحداث المستودع باستخدام GitHub REST API

تصفية الأحداث حسب النوع (مثل WatchEvent)

تخزين النتائج في ملف JSON قابل للقراءة

دعم متغيرات البيئة لتأمين التوكن

🛠️ المتطلبات
Node.js >= 18

GitHub Personal Access Token مع صلاحية repo أو public_repo

ملف .env يحتوي على التوكن

📦 التثبيت
bash
npm install
🔐 إعداد البيئة
أنشئ ملف .env في جذر المشروع وأضف التوكن الخاص بك:

env
GITHUB_USER_ACTIVITY_CLI_TOKEN=your_github_token_here
📈 الاستخدام
bash
npm run start:dev <owner> <repo> [eventType]
الأمثلة
جلب كل الأحداث لمستودع معين:

bash
npm run start:dev LadybirdBrowser ladybird
جلب الأحداث مع استثناء نوع معين (مثل WatchEvent):

bash
npm run start:dev LadybirdBrowser ladybird WatchEvent
🧾 ناتج التشغيل
يتم حفظ الأحداث المسترجعة في ملف github_activity.json بصيغة JSON منظمة.

📂 هيكل البيانات
كل عنصر في الملف يحتوي على:

ts
interface GitHubWatchEventItf {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action: "started";
  };
  public: boolean;
  created_at: string;
}
🧠 ملاحظات
تأكد من تمرير جميع الوسائط المطلوبة (owner, repo, [eventType])

يتم إنشاء ملف github_activity.json تلقائيًا إذا لم يكن موجودًا
