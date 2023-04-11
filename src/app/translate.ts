type Result = {
  translations: [
    {
      detected_source_language: string;
      text: string;
    }
  ];
};

export const translate = async (selectedText: string, userTargetLang: string) => {
  const API_KEY = '';
  const API_URL = 'https://api-free.deepl.com/v2/translate';

  const params = {
    auth_key: API_KEY,
    text: selectedText,
    target_lang: userTargetLang,
  };
  const query = new URLSearchParams(params);
  const url = API_URL + '?' + query;
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  });
  const json: Result = await res.json();
  return json.translations[0].text;
};
