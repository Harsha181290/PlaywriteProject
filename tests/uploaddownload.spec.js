const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function WriteExcelText(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await ReadExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);


}

async function ReadExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rownumber) => {

        row.eachCell((cell, colnumber) => {

            if (cell.value == searchText) {

                output.row = rownumber;
                output.column = colnumber;

            }


        })




    })
    return output;

}

test("Uploaddownloadexcelvalidation", async ({ page }) => {
    const SearchText ="Mango";
    const updateValue= "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    WriteExcelText(SearchText, updateValue, { rowChange: 0, colChange: 2 }, "C:\\Users\\harsh\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\harsh\\Downloads\\download.xlsx");
    const Textlocator=page.getByText(SearchText);
    const desiredRow= await page.getByRole('row').filter({has:Textlocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);


}
)

