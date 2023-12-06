import React from 'react';
import { Document, Page } from 'react-pdf';
function PDFViewer({ pdfUrl }) {
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [error, setError] = React.useState(null);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    function onError(error) {
      setError(error);
    }
  
    return (
      <div>
        {error ? (
          <p>Error loading PDF: {error.message}</p>
        ) : (
          <>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onError={onError}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </>
        )}
      </div>
    );
  }
  

  export default PDFViewer