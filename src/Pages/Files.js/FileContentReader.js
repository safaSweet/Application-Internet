// import React from 'react'
// import { Card, CardBody, Container } from 'react-bootstrap'

// function ReadFile() {
//   return (
//     <div>
//         <Container >
//         <h3 className=' mb-5'>Content File</h3>
//             <Card>
//                 <CardBody>
//                     <p>ddddddddddddddddddddddddddd</p>
//                     <p>tttttttttttttttttttttttttttt</p>
//                     <p>eeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
//                     <p>ddddddddddddddddddddddddddd</p>
//                     <p>ddddddddddddddddddddddddddd</p>
//                 </CardBody>
//             </Card>
//         </Container>
//     </div>
//   )
// }

// export default ReadFile


import React, { useState } from 'react';
import copy from 'clipboard-copy';

const FileContentReader = () => {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        copy(content); // نسخ النص تلقائيًا عند تحميل الملف
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>
        <strong>محتوى الملف:</strong>
        <pre>{fileContent}</pre>
      </div>
      {/* لا يلزم وجود زر للنسخ، يتم النسخ تلقائيًا */}
    </div>
  );
};

export default FileContentReader;
