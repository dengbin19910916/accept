import moment = require("moment");
import {accept} from "./model";
import Person = accept.model.Person;
import PersonType = accept.model.PersonType;

/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/kendo/kendo.web.d.ts" />
/// <reference path="../typings/bluebird/bluebird.d.ts" />

let person = new Person(PersonType.Borrower);
