let form = {};

/**
 * parse form
 */
form.parseElements = function (e)
{
    let elements = {}, i;

    if (e instanceof HTMLFormControlsCollection)
    {
        for (i in e)
        {
            let name = e[i].name,  type = e[i].type;

            if (("" === name || null === name) ||
                ("text" !== type && "hidden" !== type && "password" !== type && "textarea" !== type && "radio" !== type) ||
                ("radio" === type && !e[i].checked))
            {
                continue;
            }

            elements[name] = e[i];
        }
    }

    return elements;
};

/**
 * parse form data
 */
form.parseForm = function (elements)
{
    let data = {};

    if (elements instanceof HTMLFormControlsCollection)
    {
        for (let i in elements)
        {
            if (!elements.hasOwnProperty(i)) continue;

            let name = elements[i].name, type = elements[i].type;

            if (("" === name || null === name) ||
                ("text" !== type && "hidden" !== type && "password" !== type && "textarea" !== type && "radio" !== type) ||
                ("radio" === type && !elements[i].checked))
            {
                continue;
            }

            data[name] = elements[i]["value"];
        }
    }

    return data;
};

/**
 * build query string
 * @param data Object, {k:v, ...}
 */
form.buildQueryString = function (data)
{
    let raw = [];

    if (typeof data === "object")
    {
        for (let k in this.data)
        {
            raw.push(k + "=" + this.data[k]);
        }
    }

    return raw.join("&");
};

export default form;