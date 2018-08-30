(function ($) {
    'use strict';

    function addFileReaderDownloadLinks() {
        var readers = 0,
            $readers = $('#readers'),
            pdfLinks = $('a[href$=".pdf"], a[href$=".PDF"]'),
            wordLinks = $('a[href$=".doc"], a[href$=".docx"], a[href$=".docm"], a[href$=".rtf"], a[href$=".DOC"], a[href$=".DOCX"], a[href$=".DOCM"], a[href$=".RTF"]'),
            excelLinks = $('a[href$=".xls"], a[href$=".xlsx"], a[href$=".xlsm"], a[href$=".XLS"], a[href$=".XLSX"], a[href$=".XLSM"]'),
            powerPointLinks = $('a[href$=".ppt"], a[href$=".pptx"], a[href$=".pptm"], a[href$=".PPT"], a[href$=".PPTX"], a[href$=".PPTM"]'),
            readerLabelText = 'Download Reader';

        function buildLink (url, name, title) {
            return '<a class="reader-download noexit" href="' + url + '" target="_blank" title="' + title + '"><img src="images/icon-' + name + '.svg" class="icon-reader icon-'+ name + '"><span class="sr-only">' + title + '</span></a>';
        }

        if ($readers.length !== 0) {
            if (pdfLinks.length > 0) {
                $readers.append(buildLink('https://get.adobe.com/reader/', 'adobe-acrobat', 'Download Adobe Acrobat Reader'));
                readers++;
            }
    
            if (wordLinks.length > 0) {
                $readers.append(buildLink('http://www.microsoft.com/en-us/download/details.aspx?id=4', 'office-word', 'Download Microsoft Word Viewer'));
                readers++;
            }
    
            if (excelLinks.length > 0) {
                $readers.append(buildLink('http://www.microsoft.com/en-us/download/details.aspx?id=10', 'office-excel', 'Download Microsoft Excel Viewer'));
                readers++;
            }
    
            if (powerPointLinks.length > 0) {
                $readers.append(buildLink('http://www.microsoft.com/en-us/download/details.aspx?id=13', 'office-powerpoint', 'Download Microsoft Power Point Viewer'));
                readers++;
            }
    
            if (readers > 0) {
                if (readers > 1) {
                    readerLabelText += 's';
                }

                $readers.prepend(readerLabelText + ':')
                    .css('display', 'block');
            }
        }
    }

    window.addFileReaderDownloadLinks = addFileReaderDownloadLinks;
}(jQuery));
