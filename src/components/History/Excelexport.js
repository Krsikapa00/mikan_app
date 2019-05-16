import { saveAs } from 'file-saver'

function s2ab(s) {
    const buf = new ArrayBuffer(s.length)

    const view = new Uint8Array(buf)

    for (let i=0; i !== s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF

    return buf
}



export default  (data, username) => {
    import('xlsx').then(XLSX => {
        let wb = XLSX.utils.book_new(); 
        wb.Props = {
          Title: 'Test',
          Subject: 'Test File',
          Author: "Nick",
          CreatedDate: new Date()
        };
        wb = XLSX.utils.table_to_book(data, {sheet: "Sheet Js"});
        
      
      
        let wbout = XLSX.write(wb, {bookType:'xlsx', type: 'binary'});
      
        saveAs(new Blob([s2ab(wbout)],{type: 'application/octet-stream'}), `${username} punches.xlsx`)
    })
}