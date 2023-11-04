import { useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { ImageResize } from 'quill-image-resize-module-ts';
import theme from '../../../styles/theme';
import { useImageUploadMutation } from '../../../store/controller/imageController';
import { selectUser } from '../../../store/slice/userSlice';

// Todo. 새로고침시 accessToken 사라짐 이슈
export const EditorComponent = ({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) => {
  const QuillRef = useRef<ReactQuill>();

  const bold = Quill.import('formats/bold');
  bold.tagName = 'b';
  Quill.register(bold, true);

  const italic = Quill.import('formats/italic');
  italic.tagName = 'i';
  Quill.register(italic, true);

  const { accessToken } = useSelector(selectUser);
  const [imgUpload] = useImageUploadMutation();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/gif, image/jpeg, image/png, image/bmp');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files !== null) {
        const file = input.files[0];
        try {
          const response = await imgUpload({ accessToken, fileData: file });
          // console.log('editorImgUpload:', response);
          // console.log('editorImgUpload_accessToken:', accessToken);
          // console.log('editorImgUpload_formData:', file);
          const IMG_URL = response.data.contents[0].url;

          // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
          const range = QuillRef.current?.getEditor().getSelection();
          if (range !== null && range !== undefined) {
            const editor = QuillRef.current?.getEditor();

            editor?.insertEmbed(range.index, 'image', IMG_URL);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  Quill.register('modules/imageResize', ImageResize);
  // quill에서 사용할 모듈을 설정하는 코드
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          // [{ color: [] }, { background: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [
            'image',
            'video',
            // 'link'
          ], // nextDo: link, color, background 개발
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
        handleStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
          // other camelCase styles for size display
        },
      },
    }),
    [],
  );
  const formats = [
    'header',
    'size',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    // 'link',
    'image',
    // 'color',
    // 'background',
    'bold',
  ];

  return (
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          QuillRef.current = element;
        }
      }}
      style={{
        height: 'auto',
        borderRadius: '1rem',
        border: `2px solid ${theme.palette.primary[500]}`,
        width: '100%',
      }}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      placeholder="내용을 입력하세요"
    />
  );
};
