## [B](https://contest.yandex.ru/contest/19380/problems/B/). БЭМ _(15 баллов)_

Верстальщик Александр участвует в множестве проектов с использованием БЭМ-методологии. Он даже создал удобный плагин для любимой IDE, который позволяет ему писать имена классов в сокращенной записи и разворачивать их в полную.

Но проблема в том, что для каждого проекта люди устанавливают разные разделители между блоком, элементом и модификатором (‘block**mod**val—elem‘, ‘block–mod–val\_\_\_elem‘), и ему приходится каждый раз править это в своём плагине вручную. Помогите Александру написать модуль, который будет на основании класса определять разделитель для сущностей.

### Формат ввода

Строка с классом

Примеры возможных нотаций (модификаторы для блока во входящих данных могут быть без значения):
"block_mod**elem" // Считаем, что модификатор идет первым  
"block_mod_mod**elem"  
"block**elem*mod_mod"
"block–mod–val***elem"
"block**mod**val—elem"

Правило для разделителей – произвольное количество символов (не буквы).

Уточнения:

- Классы в проектах пишут только маленькими буквами. a-z\*
- На вход модуля подаётся строка с валидным CSS-классом.

### Формат вывода

Ваш модуль должен вернуть ответ вида:

```
{
  mod: "_", // разделитель для модификатора
  elem: "__", // разделитель для элемента
}
```

и быть оформлен, как commonJS-модуль:

```
module.exports = function(str) {

}
```