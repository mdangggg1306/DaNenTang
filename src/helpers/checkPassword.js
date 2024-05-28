export function checkpassword(newpassword, confirmpassword) {
    if (newpassword !== confirmpassword) return 'Mật khẩu không khớp!'
    return ''
}