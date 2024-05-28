export function phoneValidator(phone) {
    const re = /\b0[0-9]{9,10}\b/gmi
    if (!phone) return "Số điện thoại không được để trống!."
    if (!re.test(phone) ) return 'Nhập số điện thoại hợp lệ.'
    return ''
  }