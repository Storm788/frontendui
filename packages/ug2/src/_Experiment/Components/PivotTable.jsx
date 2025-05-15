import React from 'react'
import { useMemo } from 'react'

export const PivotTableCell = ({data, aggFunc=(arr) => arr.length, children}) => {
    const sum = useMemo(()=>aggFunc(data), [data, aggFunc])
    return (
        <>
            {sum} {children}
        </>
    )
}

const PivotTableRowHeader = ({children}) => {
    return (<>{children}</>)
}

export const PivotTableRow = ({ selector, header }) => null;

/**
 * Helper to convert PivotTableRow config to a PivotTableRowGroup element
 */
const convertRowToGroup = (data, { selector, header }, children) => {
    const values = Array.from(new Set(data.map(selector)));
    const filtermap = values.reduce((acc, v) => {
        acc[v] = row => selector(row) === v;
        return acc;
    }, {});
    return (
        <PivotTableRowGroup key={header} data={data} filtermap={filtermap} header={header}>
            {children}
        </PivotTableRowGroup>
    );
};

const PivotTableColGroupItem = ({filterfunc, data, PivotTableColGroups, PivotCells}) => {
    const filteredData = useMemo(() => data.filter(filterfunc), [data, filterfunc])
    const [FirstPivotTableColGroup, ...RestPivotTableColGroup] = PivotTableColGroups
    if (RestPivotTableColGroup.length > 0) {
        return (    
            <PivotTableColGroup {...FirstPivotTableColGroup.props} data={filteredData} >
                {RestPivotTableColGroup}
                {PivotCells}
            </PivotTableColGroup>
        )
    } else {
        return (
            <td>
                {PivotCells.map((cell, index) => <PivotTableCell key={index} {...cell} data={filteredData} />)}
            </td>
        )
    }
}

const PivotTableColGroup = ({children, data}) => {
    const PivotTableColGroups = React.Children.toArray(children)
        .filter(child => child.type === PivotTableColGroup)
    const [FirstPivotTableColGroup] = PivotTableColGroups
    const PivotCells = React.Children.toArray(children)
        .filter(child => child.type === PivotTableCell)

    if (FirstPivotTableColGroup) {
        const filters = FirstPivotTableColGroup.filtermap
        return (<>
            {Object.entries(filters).map(
                ([filtername, filterfunc]) => <PivotTableColGroupItem key={filtername} filterfunc={filterfunc} data={data} PivotTableColGroups={PivotTableColGroups} PivotCells={PivotCells} />)
            }
        </>)
    }

    return (<>
        {PivotCells.map((cell, index) => <PivotTableCell key={index} {...cell} data={data} />)}
    </>)
}

const PivotTableRowGroupItem = ({index, filtername, filterfunc, data, FirstRow, RestRows, PivotRowHeaders, Cols, PivotCells}) => {
    const [FirstCol, ...RestCols] = Cols
    const filteredData = useMemo(() => data.filter(filterfunc), [data, filterfunc])
    if (RestRows.length > 0) {
        return (
            <PivotTableRowGroup {...FirstRow.props} data={filteredData} >
                {PivotRowHeaders}

                <PivotTableRowHeader>
                    <th scope='row'>{index === 0 ? filtername : ""}</th>
                </PivotTableRowHeader>

                {RestRows}
                {Cols}
                {PivotCells}
            </PivotTableRowGroup>
        )
    } else {
        return (
            <tr>
                {PivotRowHeaders}
                <th scope='row'>{index === 0 ? filtername : ""}</th>
                <PivotTableColGroup {...FirstCol.props} data={filteredData}>
                    {RestCols}
                    {PivotCells}
                </PivotTableColGroup>
            </tr>
        )
    }    
}

const PivotTableRowGroup = ({data, filtermap={}, children}) => {
    const Cols = React.Children.toArray(children)
        .filter(child => child.type === PivotTableColGroup)

    const PivotCells = React.Children.toArray(children)
        .filter(child => child.type === PivotTableCell)
    const PivotRowHeaders = React.Children.toArray(children)
        .filter(child => child.type === PivotTableRowHeader)

    const AllRows = React.Children.toArray(children)
        .filter(child => (child.type === PivotTableRowGroup) || (child.type === PivotTableRow))
        .map(child => child.type === PivotTableRow ? convertRowToGroup(data, child.props, children) : child)
    const [FirstRow, ...RestRows] = AllRows

    return (<>
        {Object.entries(filtermap).map(
            ([filtername, filterfunc], index) => <PivotTableRowGroupItem 
                filtername={filtername} 
                filterfunc={filterfunc} 
                data={data} 
                FirstRow={FirstRow}
                RestRows={RestRows} 
                PivotRowHeaders={PivotRowHeaders} 
                Cols={Cols} 
                PivotCells={PivotCells} 
                /> )
        }
    </>)
}

export const PivotTable = ({className, data, children}) => {
    // Collect configuration from children
    const Cols = React.Children.toArray(children)
        .filter(child => child.type === PivotTableColGroup)
    const [FirstCol, ...RestCols] = Cols
    const Rows = React.Children.toArray(children)
        .filter(child => child.type === PivotTableRowGroup)
    const [FirstRow, ...RestRows] = Rows

    const PivotCells = React.Children.toArray(children)
        .filter(child => child.type === PivotTableCell)
    
    return (
        <table className={className}>
            <thead></thead>
            <tbody>
                {FirstRow ? (<PivotTableRowGroup data={data} {...FirstRow.props}>
                    {RestRows}
                    {Cols}
                    {PivotCells}
                </PivotTableRowGroup>)
                : (<tr>
                    <PivotTableColGroup data={data} {...FirstCol.props}>
                        {RestCols}
                        {PivotCells}
                    </PivotTableColGroup>
                </tr>)}
            </tbody>
        </table>
    )
}

export const PivotTableDemo = () => {
    const data = [
        { id: 1, name: 'John', age: 30, city: 'New York' },
        { id: 2, name: 'Jane', age: 25, city: 'Los Angeles' },
        { id: 3, name: 'Mike', age: 35, city: 'Chicago' },
        { id: 4, name: 'Sara', age: 28, city: 'Houston' },
        { id: 5, name: 'David', age: 40, city: 'Phoenix' },
    ]

    return (
        <div>
            <PivotTable data={data}>
                
                <PivotTableRowGroup filtermap={{
                    'New York': (row) => row.city === 'New York',
                    'Los Angeles': (row) => row.city === 'Los Angeles',
                    'Chicago': (row) => row.city === 'Chicago',
                    'Houston': (row) => row.city === 'Houston',
                    'Phoenix': (row) => row.city === 'Phoenix',
                }} />
                    
                <PivotTableColGroup filtermap={{
                    'John': (row) => row.name === 'John',
                    'Jane': (row) => row.name === 'Jane',
                    'Mike': (row) => row.name === 'Mike',
                    'Sara': (row) => row.name === 'Sara',
                    'David': (row) => row.name === 'David',
                }} />

                <PivotTableCell aggFunc={(arr) => arr.length}/>
            </PivotTable>
        </div>
    )
}
