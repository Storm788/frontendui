# Deníček
### Zadání:
- Zobrazení zkoušky (v termínu u semestru / předmětu)/ Seznam zkoušených / Podmínky zkoušek a Zápis výsledků (výkonů) souhrnná hodnocení

## **Commit na první projektový den:**
- Dne 3.4.2025 První vypsaní na stránku -> Hello World!

Odkaz:https://github.com/Storm788/frontendui/commit/f188de23ab880ba3db50ea4f346b472719745144

###### Problémy:
- Pochopení programu/ujasnění si zadání, vyjasnit si jak postupovat, rozdělení práce ve skupině
###### Vyřešené problémy:
- První kroky k pochopení fungování programu, zatím pracujeme spolu na jednom počítači a pomáháme si navzájem




## **Commit na druhý projektový den:**
- Dne 8.5.2025

Odkaz: https://github.com/Storm788/frontendui/commit/b498c0ed14828a78e1e3f9cd635b2d4b3d6ea1e4

##### Vyřešené problémy
- Vytvoření prvních mutací

##### Problémy:
- Nepodařilo se nám to nahrát na git. Žádná data v dadbázi. 
- Problém s vytvořením DeleteAsyncAction




## **Commit na třetí projektový den:**
- Dne 28.5.2025 Přidání StudentListu a propojení Exam a Evaluation

Odkaz: https://github.com/Storm788/frontendui/commit/4810045c04bd4939045e5656b6a3c3a2e0ec90f1

##### Vyřešené problémy:
- zprovoznění seznamu zkoušek
- dodělání ke každé zkoušce delete, update button/ k tomu dodělání insert buttonu
- propojení exam a evaluation
##### Problémy:
- oprava chyby u insertu, chyba userId(nepovedlo se)
- udělat ze studentů seznam studentů (navazuje na přidaní studentu do databáze, nejsou žádní studenti takže nelze zobrazit)
- přiřadit ke každému studentovi možnost ho hodnotit neboli evaluation (navazuje na vytvoření seznamu studentu)




## **Shrnutí průběžných commitů/příprava na zkoušku:**
##### Problémy mimo projektové dny:
- Původní struktura kódu začínala být neudržitelná a komplikovala další vývoj.
- Bylo potřeba vyřešit klíčové funkční otázky: jak zjistit, kteří studenti patří k dané zkoušce, jak je najít a vložit, a jak jim přiřadit možnost hodnocení.
- Aplikace nebyla připravena na správné fungovaní a její design vyžadoval vylepšení.

##### Vyřešené problémy mimo projektové dny:
- Byla přidána a vylepšena funkcionalita komponenty StudentList a zprovozněn základní seznam zkoušek s tlačítky pro úpravy a mazání.
- Došlo k propojení jednotlivých stránek pomocí routingu a k logickému spojení zkoušek (Exam) s hodnocením (Evaluation).
- Vylepšil se proces hodnocení přidáním formuláře, implementací funkce pro vkládání studentů a lepším zobrazením jejich seznamu.
- Pro lepší orientaci se integrovala nová navigační lišta (NavBar).
- Proběhl velký úklid kódu, oprava chyb a příprava na publikaci.

# Změny

## 3.4.2025

- script `createscalar.js`
- script `createvector.js`
- template `EmptyVectorsAttribute.jsx`
