import React from 'react';
import Latex from 'react-latex';


const LatexExpression = (props) => {
    return (
        <div>
            <Latex>{props.expression}</Latex>
        </div>
    )
}
LatexExpression.defaultProps = {
    expression: 'NO EXPRESSION ENTERED',
}
export default LatexExpression
