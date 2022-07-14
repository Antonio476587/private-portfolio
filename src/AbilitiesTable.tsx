import abilities, { ability } from "abilities";
import React, { useState } from "react";
import { arrow90DD } from "./Svg";

interface AbilitiesRowProps {
    ab: ability
}

function AbilitiesRow({ ab }: AbilitiesRowProps) {
    const [hidden, setHidden] = useState(true);

    const { subAbs = null } = ab;

    if (subAbs !== null) {
        return (
            <tr className="li">
                <div className="ab d-flex">
                    <h4 className="h4 ability">{ab.name}</h4>
                    <div className="container level">
                        <button
                            type="button"
                            className="buttonContent"
                            id={`btn-${ab.name}`}
                            onClick={() => setHidden(!hidden)}
                        >
                            {arrow90DD}
                        </button>
                    </div>
                </div>
                <table>
                    <tbody className="ul-sub-abs" hidden={hidden}>
                        {subAbs.map((abs) => (
                            <tr key={abs.name}>
                                <div className="sub-ab d-flex">
                                    <td><h4 className="h5 sub-ability">{abs.name}</h4></td>
                                    <td><div className="container sub-level">{abs.content}</div></td>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </tr>
        );
    }
    return (
        <tr className="li">
            <div className="ab d-flex">
                <td><h4 className="h4 ability">{ab.name}</h4></td>
                <td><div className="container level">{ab.content}</div></td>
            </div>
        </tr>
    );
}

const AbilitiesTable = React.forwardRef(function AbilitiesTable({ id, ability, abs }: abilities, ref: React.RefObject<HTMLTableElement>) {
    const abilityRow = abs.map((abs) => <AbilitiesRow ab={abs} key={abs.name} />);

    return (
        <table className={`container div-abilities ${id}`} ref={ref} hidden>
            <thead className="container div-abilities-h3">
                <tr>
                    <th className="abilities"><h3>{ability}</h3></th>
                </tr>
            </thead>

            <tbody className="container abs">
                <div className="ol ol-abs">
                    {abilityRow}
                </div>
            </tbody>
        </table>
    );
});

export default AbilitiesTable;
