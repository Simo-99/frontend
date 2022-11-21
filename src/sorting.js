import $ from 'jquery';

export function activateSorting() {

    $(setTimeout(() => {

        $('.sorting th').off("click")
        $('.sorting th').on("click", function () {

            var table = $(".table")
            var rows = table.find('tbody').children().toArray().sort(comparer($(this).index()))

            this.asc = !this.asc;
            rows = this.asc ? rows : rows.reverse()

            for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
        })

    }, 500));


}
export function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
export function parseNumeric(value) { return +value.replace(/,/g, '') }
export function isNumeric2(value) { return !isNaN(+value.replace(/,/g, '')); }
export function cleanCellValue(value) { return value.split(" ")[0] }
export function comparer(index) {
    return function (a, b) {
        var valA = cleanCellValue(getCellValue(a, index))
        var valB = cleanCellValue(getCellValue(b, index))
        return isNumeric2(valA) && isNumeric2(valB) ? parseNumeric(valA.replace(',', '')) - parseNumeric(valB.replace(',', '')) : valA.toString().localeCompare(valB.toString())
    }
}