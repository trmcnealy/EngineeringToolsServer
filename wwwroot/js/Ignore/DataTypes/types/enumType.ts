/// <reference path="../_references.ts"/>

import DisplayNameGetter = data.DisplayNameGetter;

export type EnumMemberValue = string | number;

export interface IEnumMember {
    value: EnumMemberValue;
    displayName: DisplayNameGetter;
}

/** Defines a custom enumeration data type, and its values. */
export interface IEnumType {
    /** Gets the members of the enumeration, limited to the validMembers, if appropriate. */
    members(validMembers?: EnumMemberValue[]): IEnumMember[];
}

export function createEnumType(members: IEnumMember[]): IEnumType {
    return new EnumType(members);
}

class EnumType implements IEnumType {
    private allMembers: IEnumMember[];

    constructor(allMembers: IEnumMember[]) {
        //debug.assertValue(allMembers, 'allMembers');

        this.allMembers = allMembers;
    }

    public members(validMembers?: EnumMemberValue[]): IEnumMember[] {
        let allMembers = this.allMembers;
        if (!validMembers) return allMembers;

        let membersToReturn: IEnumMember[] = [];
        for (let member of allMembers) {
            if (_.contains(validMembers, member.value)) membersToReturn.push(member);
        }
        return membersToReturn;
    }
}
