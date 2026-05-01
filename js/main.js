const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // تبديل حالة الظهور للقائمة
});


// // 1. دالة لجلب البيانات من الإنترنت (Async/Await)
// const fetchUsers = async () => {
//   // ننتظر جلب البيانات من عنوان الـ API
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const users = await response.json();

//   // 2. لنفترض أننا نريد فقط المستخدمين الذين يبدأ اسمهم بحرف "C" (استخدام Filter)
//   const filteredUsers = users.filter(user => user.id);

//   // 3. تحويل بياناتهم إلى جمل ترحيبية (استخدام Map مع Destructuring)
//   const welcomeMessages = filteredUsers.map(({ id }) => {
//     return `<a href="/user/ID_HERE"> ${id} </a>`;
//   });

//   console.log(welcomeMessages);
// };

// // تشغيل الدالة
// fetchUsers();