# Інструкція: Як додати посилання на соціальні мережі

## Де знаходити посилання в коді

У кожній картці гравця є секція `<div class="player-social">` з трьома посиланнями:

### Приклад структури:
```html
<div class="player-social">
    <a href="#" class="social-link" title="Twitch">
        <!-- SVG іконка Twitch -->
    </a>
    <a href="#" class="social-link" title="Twitter">
        <!-- SVG іконка Twitter -->
    </a>
    <a href="#" class="social-link" title="Steam">
        <!-- SVG іконка Steam -->
    </a>
</div>
```

## Як додати посилання

Замініть `href="#"` на реальні посилання:

### 1. Twitch
```html
<a href="https://www.twitch.tv/username" target="_blank" class="social-link" title="Twitch">
```
**Приклад:** `https://www.twitch.tv/linkey`

### 2. Twitter/X
```html
<a href="https://twitter.com/username" target="_blank" class="social-link" title="Twitter">
```
або
```html
<a href="https://x.com/username" target="_blank" class="social-link" title="Twitter">
```
**Приклад:** `https://twitter.com/linkey` або `https://x.com/linkey`

### 3. Steam
```html
<a href="https://steamcommunity.com/profiles/steamid" target="_blank" class="social-link" title="Steam">
```
або
```html
<a href="https://steamcommunity.com/id/customurl" target="_blank" class="social-link" title="Steam">
```
**Приклади:**
- За Steam ID: `https://steamcommunity.com/profiles/76561198012345678`
- За кастомним URL: `https://steamcommunity.com/id/username`

## Важливо

- Додайте `target="_blank"` щоб посилання відкривалися в новій вкладці
- Замініть `username` або `steamid` на реальні дані кожного гравця
- Кожен гравець має свою секцію `player-social` - додайте посилання для кожного окремо

## Приклад для гравця Linkey:

```html
<div class="player-social">
    <a href="https://www.twitch.tv/linkey" target="_blank" class="social-link" title="Twitch">
        <!-- SVG -->
    </a>
    <a href="https://twitter.com/linkey" target="_blank" class="social-link" title="Twitter">
        <!-- SVG -->
    </a>
    <a href="https://steamcommunity.com/id/linkey" target="_blank" class="social-link" title="Steam">
        <!-- SVG -->
    </a>
</div>
```
