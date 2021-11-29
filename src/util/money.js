export function Convert(number,code='AOA') {
    return Intl.NumberFormat('pt-PT',{
        style: 'currency',
        currency: code
    }).format(number)
}