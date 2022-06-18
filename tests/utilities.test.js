import {userExtractor, validators} from '../utilities.js';

it('Should test alphanumeric', () => {
    validators.validateAlphaNumeric("exercise1");
});

it('Should test alphanumeric with alphabet only', () => {
    validators.validateAlphaNumeric("exercise");
});

it('Should test alphanumeric with numbers only', () => {
    validators.validateAlphaNumeric("123455");
});

it('Should test alphanumeric with other characters', () => {
    expect(() => validators.validateAlphaNumeric("daa_!dnka2")).toThrow();
});

it('Should test the in values validation', () => {
    validators.validateFromValues("sort", ["sort", "other"]);
});

it('Should test the in values validation out of possible values', () => {
    expect(() => validators.validateFromValues("sort", ["id", "other"])).toThrow();
});

it('Should test the user validator', () => {
    expect(validators.validateUser({$type: "user", id: 123, name: "Mamzi"})).toBe(true);
});

it('Should test the user validator with wrong type', () => {
    expect(validators.validateUser({$type: "userss", id: 123, name: "Mamzi"})).toBe(false);
});

it('Should test the user validator with negative id', () => {
    expect(validators.validateUser({$type: "user", id: -1, name: "Mamzi"})).toBe(false);
});

it('Should test the user validator with float id', () => {
  expect(validators.validateUser({$type: "user", id: 1.25, name: "Mamzi"})).toBe(false);
});

it('Should test the user validator with less information', () => {
  expect(validators.validateUser({$type: "user", id: -1})).toBe(false);
});

it('Should test the user validator with empty name', () => {
    expect(validators.validateUser({$type: "user", id: 123, name: ""})).toBe(false);
});

it('Should test the user validator with more information', () => {
    expect(validators.validateUser({$type: "user", id: 123, name: "Mamzi", age: 22})).toBe(false);
});

it('should test the user extractor', () => {
   const users = userExtractor(
     {"9_hmj_af": {
             "s47ripdro": true,
             "1ims8axhe5lf": {
                 "$type": "user",
                 "id": 10014,
                 "name": "Hiang Chiem"
             },
             "ojkaauieefvu7f6": {
                 "$type": "user",
                 "id": 10020,
                 "name": "Hiang Chiem"
             },
             "n_ackydco1": {
                 "$type": "user",
                 "id": 10006,
                 "name": "Ol Glukorsk"
             },
             "jciulythd1": {
                 "$type": "user",
                 "id": 10009,
                 "name": "Racham-Voz Vunkreprid"
             },
             "3wjineomlns2": "2019-02-01 10:09:08",
             "df2exl47mtpra3": {
                 "$type": "user",
                 "id": 10009,
                 "name": "Racham-Voz Vunkreprid"
             }
         }});
   expect(users.length).toBe(5);
});