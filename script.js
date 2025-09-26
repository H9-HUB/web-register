const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// 关联button
form.addEventListener("submit", function (e) {
  e.preventDefault();  
  // 判断是否为空
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");

    // 验证成功后，将所有输入框状态恢复默认
    document.querySelectorAll(".form-item").forEach((item) => {
      // 短暂显示成功状态
      item.classList.add("success");
      
      // 1秒后恢复默认状态
      setTimeout(() => {
        item.classList.remove("success", "error");
        item.classList.add("normal");
        const small = item.querySelector("small");
        small.innerText = "";
        small.style.visibility = "hidden";
      }, 1000);
    });
    
    // 重置表单
    setTimeout(() => {
      form.reset();
    }, 1000);
  }
});

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    // 移除可能存在的normal类，确保验证状态可见
    input.parentElement.classList.remove("normal");

    // Password is required
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

function checkLength(input, min, max) {
  // 移除可能存在的normal类，确保验证状态可见
  input.parentElement.classList.remove("normal");
  
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(email) {
  // 移除可能存在的normal类，确保验证状态可见
  email.parentElement.classList.remove("normal");
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkPasswordsMatch(input1, input2) {
  // 移除可能存在的normal类，确保验证状态可见
  input2.parentElement.classList.remove("normal");
  
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}

// Format field name with proper capitalization  首字母大写
function formatFieldName(input) {
  // input id: username -> Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("success", "normal");
  formGroup.classList.add("error");
  const small = formGroup.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible";
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("error", "normal");
  formGroup.classList.add("success");
  const small = formGroup.querySelector("small");
  small.innerText = "";
  small.style.visibility = "hidden";
}
