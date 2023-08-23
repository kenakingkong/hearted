namespace MetaDataUtils {
  export interface IMetaValues {
    description: string;
    image: string;
    "image:secure_url"?: string;
    "price:amount"?: string;
    "price:currency"?: string;
    site_name: string;
    title: string;
    type: string;
    url: string;
  }

  export const getPriceFromMetaData = (data: IMetaValues) => {
    const currency = data?.["price:currency"] || "USD";
    const amount = !!data?.["price:amount"] && parseFloat(data["price:amount"]);
    if (!amount) return undefined;
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  export const parseMetaDataValues = (data: IMetaValues) => {
    return {
      title: data?.title,
      site: data?.site_name,
      url: data?.url,
      image: data?.image,
      price: getPriceFromMetaData(data),
    };
  };

  const parseMetaTags = (doc: Document) => {
    const reducer = (valueDict: any, el: Element) => {
      if (el instanceof HTMLMetaElement) {
        const key = el.getAttribute("property")?.replace("og:", "");
        if (key) {
          valueDict[key] = el.content;
        }
      }
      return valueDict;
    };

    return [...doc.head.querySelectorAll('meta[property^="og:"]')].reduce(
      reducer,
      {}
    );
  };

  export const fetchMetaData = async (link: string) => {
    return fetch(link)
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const metaValues = parseMetaTags(doc);
        return metaValues;
      })
      .catch(function (err) {
        return null;
      });
  };
}

export default MetaDataUtils;
