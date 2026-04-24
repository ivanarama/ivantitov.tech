class CodeTyper {
  constructor(element, tokens, options = {}) {
    this.el = element;
    this.tokens = tokens;
    this.speed = options.speed || 40;
    this.lineDelay = options.lineDelay || 400;
    this.startDelay = options.startDelay || 800;
    this.currentLine = 1;
    this.cursor = null;
  }

  start() {
    setTimeout(() => this._typeTokens(0), this.startDelay);
  }

  _addLineNum() {
    const span = document.createElement('span');
    span.className = 'code-line-num';
    span.textContent = this.currentLine;
    this.el.appendChild(span);
    this.currentLine++;
  }

  _addCursor() {
    if (this.cursor) this.cursor.remove();
    this.cursor = document.createElement('span');
    this.cursor.className = 'syn-cursor';
    this.cursor.innerHTML = '&nbsp;';
    this.el.appendChild(this.cursor);
  }

  _removeCursor() {
    if (this.cursor) this.cursor.remove();
  }

  async _typeTokens(index) {
    if (index >= this.tokens.length) {
      this._addCursor();
      return;
    }

    const token = this.tokens[index];

    if (token.type === 'newline') {
      this.el.appendChild(document.createTextNode('\n'));
      this._addLineNum();
      await this._delay(this.lineDelay);
      this._typeTokens(index + 1);
      return;
    }

    if (token.type === 'linestart') {
      this._addLineNum();
      this._typeTokens(index + 1);
      return;
    }

    const span = document.createElement('span');
    if (token.cls) span.className = token.cls;

    this.el.appendChild(span);
    await this._typeText(span, token.text);
    this._typeTokens(index + 1);
  }

  async _typeText(span, text) {
    for (let i = 0; i < text.length; i++) {
      this._removeCursor();
      span.textContent += text[i];
      this._addCursor();
      const jitter = (Math.random() - 0.5) * 30;
      await this._delay(this.speed + jitter);
    }
    this._removeCursor();
  }

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 1C code tokens with syntax highlighting
const codeTokens = [
  { type: 'linestart' },
  { text: '// ', cls: 'syn-comment' },
  { text: 'Вайбкодинг: когда код — это поток', cls: 'syn-comment' },
  { type: 'newline' },
  { text: 'Процедура ', cls: 'syn-keyword' },
  { text: 'СоздатьРешение', cls: 'syn-function' },
  { text: '(', cls: '' },
  { text: 'Контекст', cls: 'syn-variable' },
  { text: ')', cls: '' },
  { type: 'newline' },
  { text: '    ', cls: '' },
  { text: 'Задача', cls: 'syn-variable' },
  { text: ' = ', cls: '' },
  { text: 'Контекст', cls: 'syn-variable' },
  { text: '.', cls: '' },
  { text: 'ПолучитьЗадачу', cls: 'syn-function' },
  { text: '();', cls: '' },
  { type: 'newline' },
  { text: '    ', cls: '' },
  { text: 'Если ', cls: 'syn-keyword' },
  { text: 'Задача', cls: 'syn-variable' },
  { text: '.', cls: '' },
  { text: 'Сложность', cls: 'syn-variable' },
  { text: ' > ', cls: '' },
  { text: '9000', cls: 'syn-number' },
  { text: ' ', cls: '' },
  { text: 'Тогда', cls: 'syn-keyword' },
  { type: 'newline' },
  { text: '        ', cls: '' },
  { text: 'Поток', cls: 'syn-variable' },
  { text: ' = ', cls: '' },
  { text: 'ВключитьВайб', cls: 'syn-function' },
  { text: '(', cls: '' },
  { text: '"максимум"', cls: 'syn-string' },
  { text: ');', cls: '' },
  { type: 'newline' },
  { text: '        ', cls: '' },
  { text: 'Результат', cls: 'syn-variable' },
  { text: ' = ', cls: '' },
  { text: 'Поток', cls: 'syn-variable' },
  { text: '.', cls: '' },
  { text: 'Генерировать', cls: 'syn-function' },
  { text: '(', cls: '' },
  { text: 'Задача', cls: 'syn-variable' },
  { text: ');', cls: '' },
  { type: 'newline' },
  { text: '    ', cls: '' },
  { text: 'КонецЕсли', cls: 'syn-keyword' },
  { text: ';', cls: '' },
  { type: 'newline' },
  { text: 'КонецПроцедуры', cls: 'syn-keyword' },
];
