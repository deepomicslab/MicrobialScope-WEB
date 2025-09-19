# Download API Documentation

## Overview

The Download API provides endpoints to retrieve genomic and annotation data for microbial genomes from the MicrobialScope database. It supports downloading metadata in CSV format, as well as FASTA, GenBank, GFF3, and various annotation files for specific genomes. The API is implemented in Django and supports four microbe types (`archaea`, `bacteria`, `fungi`, `viruses`) and two genome types (`mag` and `monoisolate`).

Base URL: `https://microbialapi.deepomics.org/api/download/`

## Endpoints

### 1. Download Metadata

**Endpoint**: `GET /api/download/meta`

**Description**: Downloads filtered microbe metadata as a CSV file. Supports filtering by organism name, species, total sequence length range, and GC content range.

**Parameters**:

| Parameter                   | Type    | Required | Description                                               | Valid Values                              |
| --------------------------- | ------- | -------- | --------------------------------------------------------- | ----------------------------------------- |
| `microbe`                   | String  | Yes      | Type of microbe                                           | `archaea`, `bacteria`, `fungi`, `viruses` |
| `type`                      | String  | Yes      | Genome type                                               | `mag`, `monoisolate`                      |
| `organism_name`             | String  | No       | Filter by organism name (case-insensitive, partial match) | Any string                                |
| `species`                   | String  | No       | Filter by species (case-insensitive, partial match)       | Any string                                |
| `total_sequence_length_min` | Integer | No       | Minimum total sequence length                             | Positive integer                          |
| `total_sequence_length_max` | Integer | No       | Maximum total sequence length                             | Positive integer                          |
| `gc_content_min`            | Float   | No       | Minimum GC content percentage                             | 0 to 100                                  |
| `gc_content_max`            | Float   | No       | Maximum GC content percentage                             | 0 to 100                                  |

**Response**:

- **Success**: A streaming CSV file named `<microbe>_<type>_data.csv` containing filtered genome metadata.
- **Content-Type**: `text/csv`
- **Content-Disposition**: `attachment; filename="<microbe>_<type>_data.csv"`

**Errors**:

- **400 Bad Request**: Invalid parameters (e.g., invalid `microbe`, `type`, non-numeric or negative `total_sequence_length`, GC content outside 0–100, or min > max).
- **500 Internal Server Error**: Internal server error. Please contact us through the Contact page for assistance.

---

### 2. Download FASTA Data

**Endpoint**: `GET /api/download/fasta`

**Description**: Downloads a compressed FASTA file (`.fna.gz`) for a specific genome identified by `unique_id`.

**Parameters**:

| Parameter   | Type   | Required | Description                     | Valid Values                              |
| ----------- | ------ | -------- | ------------------------------- | ----------------------------------------- |
| `microbe`   | String | Yes      | Type of microbe                 | `archaea`, `bacteria`, `fungi`, `viruses` |
| `type`      | String | Yes      | Genome type                     | `mag`, `monoisolate`                      |
| `unique_id` | String | Yes      | Unique identifier of the genome | Valid genome ID                           |

**Response**:

- **Success**: A compressed FASTA file named `<unique_id>.fna.gz`.
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.fna.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

---

### 3. Download GenBank Data

**Endpoint**: `GET /api/download/gbk`

**Description**: Downloads a compressed GenBank file (`.gbk.gz`) for a specific genome identified by `unique_id`.

**Parameters**:

| Parameter   | Type   | Required | Description                     | Valid Values                              |
| ----------- | ------ | -------- | ------------------------------- | ----------------------------------------- |
| `microbe`   | String | Yes      | Type of microbe                 | `archaea`, `bacteria`, `fungi`, `viruses` |
| `type`      | String | Yes      | Genome type                     | `mag`, `monoisolate`                      |
| `unique_id` | String | Yes      | Unique identifier of the genome | Valid genome ID                           |

**Response**:

- **Success**: A compressed GenBank file named `<unique_id>.gbk.gz`.
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.gbk.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

---

### 4. Download GFF Data

**Endpoint**: `GET /api/download/gff`

**Description**: Downloads a compressed GFF3 file (`.gff.gz`) for a specific genome identified by `unique_id`.

**Parameters**:

| Parameter   | Type   | Required | Description                     | Valid Values                              |
| ----------- | ------ | -------- | ------------------------------- | ----------------------------------------- |
| `microbe`   | String | Yes      | Type of microbe                 | `archaea`, `bacteria`, `fungi`, `viruses` |
| `type`      | String | Yes      | Genome type                     | `mag`, `monoisolate`                      |
| `unique_id` | String | Yes      | Unique identifier of the genome | Valid genome ID                           |

**Response**:

- **Success**: A compressed GFF3 file named `<unique_id>.gff.gz`.
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.gff.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

---

### 5. Download Annotation Data

**Endpoint**: `GET /api/download/annotation`

**Description**: Downloads annotation data as a CSV or TSV file for a specific genome identified by `unique_id`. Supports multiple annotation types. For `protein`, `arg`, and `tmh`, serves pre-existing TSV files. For other annotations, generates a CSV from database records.

**Parameters**:

| Parameter    | Type   | Required | Description                     | Valid Values                                                 |
| ------------ | ------ | -------- | ------------------------------- | ------------------------------------------------------------ |
| `microbe`    | String | Yes      | Type of microbe                 | `archaea`, `bacteria`, `fungi`, `viruses`                    |
| `type`       | String | Yes      | Genome type                     | `mag`, `monoisolate`                                         |
| `unique_id`  | String | Yes      | Unique identifier of the genome | Valid genome ID                                              |
| `annotation` | String | Yes      | Type of annotation              | `protein`, `rna`, `crispr`, `anti`, `sm`, `sp`, `vf`, `arg`, `tmh` |

**Supported Annotations**:

- `protein`: Protein.
- `rna`: tRNA & tmRNA.
- `crispr`: CRISPR/Cas System.
- `anti`: Anti-CRISPR Element.
- `sm`: Secondary Metabolite Biosynthetic Cluster.
- `sp`: Signal Peptide.
- `vf`: Virulence Factor.
- `arg`: Antibiotic Resistance Gene.
- `tmh`: Transmembrane Protein.

**Response**:

- **For `protein`, `arg`, `tmh`**:
  - A TSV file named `<microbe>_<type>_<annotation>_<unique_id>.tsv`.
  - **Content-Type**: `text/tab-separated-values`
  - **Content-Disposition**: `attachment; filename="<microbe>_<type>_<annotation>_<unique_id>.tsv"`
- **For `rna`, `crispr`, `anti`, `sm`, `sp`, `vf`**:
  - A streaming CSV file named `<microbe>_<type>_<annotation>_<unique_id>.csv`.
  - **Content-Type**: `text/csv`
  - **Content-Disposition**: `attachment; filename="<microbe>_<type>_<annotation>_<unique_id>.csv"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, `annotation`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id`, missing TSV file, or no records for generated annotations.
- **500 Internal Server Error**: Internal server error. Please contact us through the Contact page for assistance.

---

## Error Responses

All endpoints return JSON error responses with the following structure:

```json
{
  "error": "<error message>"
}
```

- **400 Bad Request**: Invalid or missing parameters, or invalid parameter values (e.g., negative `total_sequence_length_min`, invalid `microbe`).
- **404 Not Found**: Non-existent `unique_id`, missing file, or no records found for the requested annotation.
- **500 Internal Server Error**: Internal server error. Please contact us through the Contact page for assistance.

## Notes

- **Case Insensitivity**: All string parameters (`microbe`, `type`, `annotation`, etc.) are case-insensitive.
- **Streaming Responses**: Metadata and generated annotation CSVs use `StreamingHttpResponse` for efficient handling of large datasets.
- **File Naming**: Generated CSV filenames include `microbe`, `type`, `annotation`, and `unique_id` for clarity.
- **CRISPR Special Case**: The `crispr` annotation queries `CRISPRCas` models but includes related `CRISPR` records via the `CRISPRs` relationship.
- **Fungi and Viruses**: Some annotations (`crispr`, `anti` for fungi; `sm`, `sp`, `arg` for viruses) are not supported, as per the model map.

# Download API Use Case

## Meta Download

- **Request URL:** https://microbialapi.deepomics.org/api/download/meta?microbe=bacteria&type=mag&species=Mycobacterium&total_sequence_length_min=1000000&gc_content_min=30 
- **Description:** This API request retrieves metadata for bacteria of the type "mag", specifically for the species "Mycobacterium." The results are filtered based on the following criteria:
  - **microbe**: bacteria
  - **type**: mag
  - **species**: Mycobacterium
  - **total_sequence_length_min**: Minimum total sequence length is set to 1,000,000 base pairs.
  - **gc_content_min**: Minimum GC content percentage is set to 30%.
- **Request Example:**

```bash
curl -o mag_bacteria_filtered.csv  "https://microbialapi.deepomics.org/api/download/meta?microbe=bacteria&type=mag&species=Mycobacterium&total_sequence_length_min=1000000&gc_content_min=30"
```

- **Result:** Saves the response as a CSV file named `mag_bacteria_filtered.csv` to the local machine for further use.

## FASTA Data Download

- **Request URL:** https://microbialapi.deepomics.org/api/download/fasta?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
- **Description:** This API request downloads a compressed FASTA file (`.fna.gz`) for a specific genome identified by the `unique_id` **GCA_000025685.1**. The request is filtered with the following parameters:
  - **microbe**: archaea.
  - **type**: monoisolate.
  - **unique_id**: GCA_000025685.1.
- **Request Example:**

```bash
curl -o GCA_000025685.1.fna.gz "https://microbialapi.deepomics.org/api/download/fasta?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1"
```

- **Result:** Saves the response as a compressed FASTA file named `GCA_000025685.1.fna.gz` to the local machine for further use.

## GenBank Data Download

- **Request URL:** https://microbialapi.deepomics.org/api/download/gbk?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
- **Description:** This API request downloads a compressed GenBank file (`.gbk.gz`) for a specific genome identified by the `unique_id` **GCA_000025685.1**. The request is filtered with the following parameters:
  - **microbe**: archaea.
  - **type**: monoisolate.
  - **unique_id**: GCA_000025685.1.
- **Request Example:**

```bash
curl -o GCA_000025685.1.gbk.gz "https://microbialapi.deepomics.org/api/download/gbk?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1"
```

- **Result:** Saves the response as a compressed GenBank file named `GCA_000025685.1.gbk.gz`to the local machine for further use.

## GFF Data Download

- **Request URL:** https://microbialapi.deepomics.org/api/download/gff?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
- **Description:** This API request downloads a compressed GFF file (`.gff.gz`) for a specific genome identified by the `unique_id` **GCA_000025685.1**. The request is filtered with the following parameters:
  - **microbe**: archaea.
  - **type**: monoisolate.
  - **unique_id**: GCA_000025685.1.
- **Request Example:**

```bash
curl -o GCA_000025685.1.gff.gz "https://microbialapi.deepomics.org/api/download/gff?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1"
```

- **Result:** Saves the response as a compressed GFF file named `GCA_000025685.1.gff.gz`to the local machine for further use.

## Annotation Data Download

- **Request URL:** https://microbialapi.deepomics.org/api/download/annotation?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1&annotation=arg
- **Description:** This API request downloads annotation data for a specific genome identified by the `unique_id` **GCA_000025685.1**. The request is filtered by the following parameters:
  - **microbe**: archaea.
  - **type**: monoisolate.
  - **unique_id**: GCA_000025685.1.
  - **annotation**: arg (Antibiotic Resistance Gene).
- **Request Example:**

```bash
curl -o archaea_monoisolate_arg_GCA_000025685.1.tsv "https://microbialapi.deepomics.org/api/download/annotation?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1&annotation=arg"
```

- **Result:** Saves the response as a TSV file file named `archaea_monoisolate_arg_GCA_000025685.1.tsv`to the local machine for further use.

## Annotation Data Batch Download

- **Get Filtered Meta:**

```bash
curl -o archaea_monoisolate_data.csv "https://microbialapi.deepomics.org/api/download/meta?microbe=archaea&type=monoisolate&species=Haloferax%20volcanii"
```

- **Run Shell Script to Batch Download Annotation:**

```shell
#!/bin/bash

# Define the path to the filtered meta CSV file
csv_file="archaea_monoisolate_data.csv"

# Read the CSV file, skipping the header row
tail -n +2 "$csv_file" | while IFS=',' read -r Unique_ID _ _ _ _ _ _ _ _ _ _ _ _
do
  # Get the microbe unique ID from the first column
  echo "Sending request for Microbe: $Unique_ID"
  
  # Request the annotation data for the given unique ID and annotation type 'arg'
  curl -o "${Unique_ID}.tsv" "https://microbialapi.deepomics.org/api/download/annotation?microbe=archaea&type=monoisolate&unique_id=${Unique_ID}&annotation=arg"
  
  # Print a message indicating the request has been sent
  echo "Request sent for ${Unique_ID}"
done
```

