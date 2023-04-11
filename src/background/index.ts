import { getBucket } from '@extend-chrome/storage';

import { translate } from '../app/translate';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translation',
    title: '選択したテキストを翻訳',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'translation': {
        const selectedText = info.selectionText !== undefined ? info.selectionText : '';
        const value = await bucket.get();
        const userTargetLang = value.targetLang ?? 'EN';
        const translatedText = await translate(selectedText, userTargetLang);
        console.log(translatedText);
        break;
      }
    }
  }
});

export {};
