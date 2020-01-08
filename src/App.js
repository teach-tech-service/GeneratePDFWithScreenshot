import React from 'react';
import logo from './logo.svg';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './App.css';

class App extends React.Component {
  state = {
    tabels: [{
      name: "Programowanie",
      columns: [
        {
          name: "ID",
          type: "SERIAL"
        },
        {
          name: "name",
          type: "TEXT"
        },
        {
          name: "email",
          type: "VARCHAR"
        },
        {
          name: "product_id",
          type: "INTEGER"
        }
      ],
      referencedTables: [
        {
          tableName: "Product",
          columnName: "product_id",
          type: "many",
          columnNameCurrent: "ID"
        },
        {
          tableName: "Kurs",
          columnName: "product_id",
          type: "many",
          columnNameCurrent: "ID"
        }
      ]
    },
    {
      name: "Product",
      referencedTables: [],
      columns: [
        {
          name: "ID",
          type: "SERIAL"
        },
        {
          name: "name",
          type: "TEXT"
        },
        {
          name: "product_id",
          type: "int"
        }
      ]
    }, {
      name: "Kurs",
      referencedTables: [],
      columns: [
        {
          name: "ID",
          type: "SERIAL"
        },
        {
          name: "programowanie_id",
          type: "int"
        }
      ]
    }]
  }

  createTables() {
    const tables = []
    for (let i = 0; i < this.state.tabels.length; i++) {
      const columns = []
      for (let k = 0; k < this.state.tabels[i].columns.length; k++) {
        for (let m = 0; m < this.state.tabels[i].referencedTables.length; m++) {
          if (this.state.tabels[i].referencedTables[m].columnNameCurrent === this.state.tabels[i].columns[k].name) {
            for (let g = 0; g < this.state.tabels.length; g++) {

              if (this.state.tabels[g].name === this.state.tabels[i].name) {
                continue
              }
              console.log(this.state.tabels[g].name)
              for (let l = 0; l < this.state.tabels[g].columns.length; l++) {

                console.log(this.state.tabels[g].columns[l].name, this.state.tabels[i].referencedTables[m].columnName)
                if (this.state.tabels[g].columns[l].name === this.state.tabels[i].referencedTables[m].columnName) {

                }
              }
            }
          }

        }
        columns.push(
          <div className="tabel-col">
            <div>{this.state.tabels[i].columns[k].name}</div>
            <div>{this.state.tabels[i].columns[k].type}</div>
          </div>
        )
      }
      tables.push(
        <div className="tabel" style={{ left: i * 250 }}>
          <div className="tabel-header">
            {this.state.tabels[i].name}
          </div>
          <div className="tabel-body">
            {columns}
          </div>
        </div>
      )
    }
    return tables
  }

  generatePDF = () => {
    const printArea = document.getElementById("field-prop")
    html2canvas(printArea).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, printArea.getBoundingClientRect().width, printArea.getBoundingClientRect().height);
      pdf.save("download.pdf");

    })
  }

  render() {
    return (
      <div>
        <div className="nav"></div>
        <div id="field-prop">
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
        <div className="field" id="field">
          {
            this.createTables()
          }
        </div>
        <button onClick={this.generatePDF} style={{ marginTop: 500 }}>Generate PDF</button>
      </div>

    )
  }
}

export default App;
