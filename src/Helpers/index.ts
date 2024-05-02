export function numeroPreco(valor: any) {
  valor = Number(valor);

  if (!Number.isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  return "";
}

export function removerMascaraCPFouCNPJ(valor: any) {
  return valor.replace(/(\.|\/|\/-)/g,"");
}

export function mascaraCpf(valor: any) {
  return valor
    .replace(/\D/g,"")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d)/,"$1.$2")
    .replace(/(\d{3})(\d{1,2})$/,"$1-$2")
}

export function mascaraCnpj(valor: any) {
  return valor
    .replace(/\D/g,"")
    .replace(/^(\d{2})(\d)/,"$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    .replace(/\.(\d{3})(\d)/,".$1/$2")
    .replace(/(\d{4})(\d)/,"$1-$2")
}

export function mascaraCEP(valor: any) {
  return valor
    .replace(/\D/g,"")
    .replace(/\D/g,"")
    .replace(/^(\d{2})(\d)/,"$1.$2")
    .replace(/\.(\d{3})(\d)/,".$1-$2")
}

export function mascaraData(value: any) {
  if (!value) return "";

  let ano = value.split('-')[0];
  let mes = value.split('-')[1];
  let dia = value.split('-')[2].substring(0, 2);

  return `${dia}/${mes}/${ano}`;
}

export function dataAtualFormatada() {
  const data = new Date();
  const dia = data.getDate().toString();
  const diaF = (dia.length === 1) ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString();
  const mesF = (mes.length === 1) ? `0${mes}` : mes;
  const anoF = data.getFullYear();

  return `${diaF}/${mesF}/${anoF}`;
}

export function formatMoney(v: any) {
  v = v.replace(/\D/g, '');
  v = (v / 100).toFixed(2);
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

  return v;
}

export function revertMoney(v: any) {
  v = v.replaceAll('.', "");
  v = v.replaceAll(',', ".");

  return v;
}

export function orderTableKeys(keys = [], head  = []) {
  return keys.sort((a, b) => {
    const indexA = head.findIndex((item: any) => item.key === a);
    const indexB = head.findIndex((item: any) => item.key === b);
  
    // Se uma chave não estiver presente em head, coloque-a no final
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
  
    return indexA - indexB;
  });
}

export function formatDateTimeBR(utcDateTimeString: string) {
  const utcDate = new Date(utcDateTimeString);
  utcDate.setUTCHours(utcDate.getUTCHours() - 3);
  const dateUTCFormatted = utcDate.toISOString();
  const [date, hour] = dateUTCFormatted
    .replace('Z', '')
    .replace('.000', '')
    .split('T');

  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]
  return `${day}/${month}/${year} ${hour}`;
}

export function formatDateBR(utcDateString: string) {
  const date = formatDateTimeBR(utcDateString)
  return date.split(' ')[0];
}
