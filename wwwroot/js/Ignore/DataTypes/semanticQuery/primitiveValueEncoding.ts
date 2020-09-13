/// <reference path="../_references.ts"/>

export module data {
    export module PrimitiveValueEncoding {
        export function decimal(value: number): string {
            //debug.assertValue(value, "value");

            return value + "M";
        }

        export function double(value: number): string {
            //debug.assertValue(value, "value");

            return value + "D";
        }

        export function integer(value: number): string {
            //debug.assertValue(value, "value");

            return value + "L";
        }

        export function dateTime(value: Date): string {
            //debug.assertValue(value, "value");
            // Currently, server doesn't support timezone. All date time data on the server don't have time zone information.
            // So, when we construct a dateTime object on the client, we will need to ignor user's time zone and force it to be UTC time.
            // When we subtract the timeZone offset, the date time object will remain the same value as you entered but dropped the local timeZone.
            var date = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
            var dateTimeString = date.toISOString();
            // If it ends with Z, we want to get rid of it, because with trailing Z, it will assume the dateTime is UTC, but we don't want any timeZone information, so
            // we will drop it.
            // Also, we need to add Prefix and Suffix to match the dsr value format for dateTime object.
            if (StringExtensions.endsWith(dateTimeString, "Z")) dateTimeString = dateTimeString.substr(0, dateTimeString.length - 1);
            return "datetime'" + dateTimeString + "'";
        }

        export function text(value: string): string {
            //debug.assertValue(value, "value");

            return "'" + value.replace("'", "''") + "'";
        }

        export function nullEncoding(): string {
            return "null";
        }

        export function boolean(value: boolean): string {
            return value ? "true" : "false";
        }
    }
}
