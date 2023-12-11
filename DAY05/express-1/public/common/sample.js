function handleValidation() {
  if (document.getElementById('email').value == '') {
    alert('메일주소를 입력해주세요.');
    document.getElementById('email').focus();
    return false;
  }
  if (document.getElementById('password').value == '') {
    alert('비밀번호를 입력해주세요.');
    document.getElementById('password').focus();
    return false;
  }
}
