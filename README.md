<p align="center">
  <img src="https://github.com/spandin/clean-shelving/blob/main/public/icon-256x256.png" />
</p>

# Clean Shelving
<i>@spandin</i>
<i>version: 1.0.0</i>

Приложение Clean Shelving (Чистые полки) - это прогрессивное offline-first веб-приложение (PWA), созданное с использованием React, предназначенное для помощи менеджерам магазинов и сотрудникам в отслеживании просроченных товаров. 

С помощью Clean Shelving вы можете добавлять, редактировать и удалять товары, а также просматривать список всех товаров, находящихся в системе.

## Возможности:
<ul>
  <li>Авторизация: войдите в свой аккаунт, используя логин и пароль;</li>
  <li>Добавление товаров: добавьте новые товары в систему, указав их название, штрих код, количество, срок годности и категорию;</li>
  <li>Редактирование товаров: измените информацию о товаре, если это необходимо;</li>
  <li>Удаление товаров: удалите товар из системы, если это необходимо;;</li>
  <li>Список товаров: просмотрите список всех товаров в системе;</li>
  <li>Фильтрация списка: изменение списка по категориям или же по состоянию.</li>
</ul>

### Состояние товара:
Для каждого товара в системе Clean Shelving можно узнать его текущее состояние: добавлен ли он в систему магазина. Эта информация отображается в виде индикаторов рядом с названием товара.
Если товар добавлен в систему, индикатор будет зеленым. Если товар не добавлен, индикатор будет красным.

<i>* Под системами подразумевается ERP, которое использует магазин.</i>

### Экспорт в Excel:
Это позволяет легко и быстро получить информацию о товарах в удобном для анализа виде.
Для экспорта списка товаров пользователю достаточно нажать на кнопку “Экспортировать” в приложении. 

Важно! При экспорте файла состояние товар изменится на "Внесён".

### Локальная база штрихкодов
Clean Shelving также включает в себя локальную базу штрихкодов. 

Эта функция работает следующим образом, при добавлении товара, информация о штрихкоде автоматически сохраняется в отдельную коллекцию в базе данных. При повторном вводе информация о штрихкоде уже сама будет подгружаться в поля формы.

### Поиска похожих товаров
Если ввести штрихкод в форме добавления, то программа проверит не существует ли уже в базе данных товара с таким же штрихкодом. Если же совпадения будут найдены, программа оповестит вас о этом и покажет кнопку, нажав которую можно будет увидеть похожие объекты.

## Цель создания:
Да подобные функции решает ERP системы в связке с ТСД, но как показала практика из личного опыта, за n`ное количество времени проработанное в сети магазинов администратором ТО, при приемке товаров никто вводом сроков в ТСД не занимается. Так как товар нужно принять как можно скорее и выставить на полку. 

Если уже поработаешь пару месяцев, сам взглядом понимаешь, где какой товар не реализуется и проще самому ручками внести в тетрадку, как это было у нас, после же с этой тетради вносилось все вручную в ERP LS Fusion.

Тут и появилась идея сделать приложение.

<ul>Плюсы:
<li>Читаемость: решена проблема с понятием чужого подчерка;</li>
<li>Скорость: у каждого есть телефон, не приходиться делить тетрадь между собой;</li>
<li>Excel: экспорт файла помогает Зав. ТО в пару копирастов отправить товары на уценку. Ранее каждая позиция вносилась в ручную с тетради;</li>
<li>Контроль: система балов и активностей сотрудников помогает всем видеть, кто на работе работает, а кто приходит отбыть время.</li>
</ul>

<i>С Clean Shelving ваш магазин будет в порядке!</i>
