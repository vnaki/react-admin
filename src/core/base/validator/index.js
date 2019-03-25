/**
 * Message object
 */
function Message (ok)
{
    this.ok      = !!ok;
    this.message = "please set the prompt message";
}

/**
 * Validator
 */
class Validator
{
    /**
     * Message queue
     */
    messages = [];

    /**
     * cannot be empty
     */
    require (v)
    {
        return this.matchBool(v !== "" && v !== undefined);
    }

    /**
     * Maximum and Minimum Length of Strings
     */
    size (v, min, max)
    {
        let l = v.length;
        return this.matchBool(l >= parseInt(min) && l <= parseInt(max));
    }

    /**
     * Minimum Length of Strings
     */
    minSize (v, min)
    {
        return this.matchBool(v.length >= parseInt(min));
    }

    /**
     * Maximum Length of Strings
     */
    maxSize (v, max)
    {
        return this.matchBool(v.length <= parseInt(max));
    }

    /**
     * Minimum value
     */
    minInt (v, min)
    {
        return this.matchBool(parseInt(v) >= parseInt(min));
    }

    /**
     * Maximum value
     */
    maxInt (v, max)
    {
        return this.matchBool(parseInt(v) <= parseInt(max));
    }

    /**
     * Determine whether a value is in an array
     */
    range (v, a)
    {
        let ok = false;

        if (a instanceof Array)
        {
            for (let i in a)
            {
                if (a[i] === v)
                {
                    ok = true;
                    break;
                }
            }
        }

        return this.matchBool(ok);
    }

    number (v)
    {
        return this.match(/^-?\d+$/, v);
    }

    positive (v)
    {
        return this.match(/^[1-9]\d*$/, v);
    }

    negative (v)
    {
        return this.match(/^-[1-9]\d*$/, v);
    }

    float (v)
    {
        return this.match(/^-?\d+\.\d+$/, v);
    }

    email (v)
    {
        return this.match(/^[0-9a-z]+(-[0-9a-z]+)*@[0-9a-z]+(\.[a-z]{2,3}){1,2}$/i, v);
    }

    mobile (v)
    {
        return this.match(/^1[3578]\d{9}$/, v);
    }

    zipcode (v)
    {
        return this.match(/^[1-9]\d{5}$/, v);
    }

    domain (v)
    {
        return this.match(/^[0-9a-z]+(-[0-9a-z]+)*(\.[a-z]{2,3}){1,2}$/i, v);
    }

    ipv4 (v)
    {
        return this.match(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i, v);
    }

    /**
     * validate date
     * @param v string
     */
    date(v)
    {
        return this.match(/^[12]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|30|31)$/, v);
    }

    /**
     * validate date time
     * @param v string
     */
    datetime(v)
    {
        return this.match(/^[12]\d{3}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[1-2][0-9]|30|31)(\s{1,3}(23|22|21|20|[0-1][0-9]):[0-5][0-9]:[0-5][0-9])$/, v);
    }

    /**
     * validate letter(A-Z or a-z)
     * @param v string
     */
    letter (v)
    {
        return this.match(/^[a-z]+$/i, v);
    }

    /**
     * validate number or letter (0-9 or A-Z or a-z)
     */
    alpha (v)
    {
        return this.match(/^[0-9a-z]+$/i, v);
    }

    /**
     * validate complex string, by number(0-9) or letter (A-Za-z) or underline(_)
     */
    alphaDash (v)
    {
        return this.match(/^[0-9a-z]+(_[0-9a-z]+)*$/i, v);
    }

    /**
     * validate chinese characters
     */
    ch (v)
    {
        return this.match(/^[\u4e00-\u9fa5]+$/, v);
    }

    /**
     * regular expression matching
     * @param pattern string, regexp
     * @param v       string
     */
    match (pattern, v)
    {
        return this.matchBool(pattern.test(v));
    }

    /**
     * regular expression matching
     * @param ok bool
     */
    matchBool (ok)
    {
        let m = new Message(ok);
        this.messages.push(m);

        return m;
    }

    /**
     * verification results
     * @return array
     */
    validate ()
    {
        let m = this.getMessages();

        if (m.length === 0)
        {
            return [true, ""];
        }

        return [false, m[0]];
    }

    /**
     * return validate message object
     * @return array
     */
    getMessages ()
    {
        let m = [];

        for (let i in this.messages)
        {
            if (this.messages[i].ok === false)
            {
                m.push(this.messages[i].message);
            }
        }

        return m;
    }
}

export default Validator;