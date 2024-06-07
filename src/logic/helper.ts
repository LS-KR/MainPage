export function parseSearch(s: string): string {
    const sa = s.split(' ')
    let r = ''
    for (const v of sa) {
        if (r == '') r += v
        else r += '+' + v
    }
    return 'https://www.google.com/search?client=firefox-b-d&q=' + r
}

export function trim(str: string, ch: string) {
    let start = 0
    let end = str.length

    while (start < end && str[start] === ch) ++start

    while (end > start && str[end - 1] === ch) --end

    return start > 0 || end < str.length ? str.substring(start, end) : str
}

export function getResponseSync(url: string): string {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.send()
    return xhr.responseText
}

export function randint(min: number, max: number): number {
    return Math.floor(rand(min, max))
}

export function rand(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min
}

export function isURL(s: string): boolean {
    const regex = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    )
    return regex.test(s)
}
