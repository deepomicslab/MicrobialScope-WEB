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
  - Headers are defined by the respective `get_csv_header` function in the microbe's view module (e.g., `archaea_views.genomes_views.get_csv_header`).
  - Rows are generated using the `to_csv_row` function.
- **Content-Type**: `text/csv`
- **Content-Disposition**: `attachment; filename="<microbe>_<type>_data.csv"`

**Errors**:

- **400 Bad Request**: Invalid parameters (e.g., invalid `microbe`, `type`, non-numeric or negative `total_sequence_length`, GC content outside 0–100, or min > max).
- **500 Internal Server Error**: Internal server error. Please contact us through the Contact page for assistance.

**Example**:

```
GET /api/download/meta?microbe=bacteria&type=mag&species=Mycobacterium&total_sequence_length_min=1000000&gc_content_min=30
```

Returns a CSV file `bacteria_mag_data.csv` with metadata for MAG bacteria genomes matching the filters.

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
  - File path: `MEDIA_DATA_DIR/<Microbe>/MAG/fna/<unique_id>.fna.gz` (for `mag`) or `MEDIA_DATA_DIR/<Microbe>/unMAG/fna/<unique_id>.fna.gz` (for `monoisolate`).
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.fna.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

**Example**:

```
GET /api/download/fasta?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
```

Returns `GCA_000025685.1.fna.gz` from `MEDIA_DATA_DIR/Archaea/unMAG/fna/GCA_000025685.1.fna.gz`.

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
  - File path: `MEDIA_DATA_DIR/<Microbe>/MAG/gbk/<unique_id>.gbk.gz` (for `mag`) or `MEDIA_DATA_DIR/<Microbe>/unMAG/gbk/<unique_id>.gbk.gz` (for `monoisolate`).
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.gbk.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

**Example**:

```
GET /api/download/gbk?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
```

Returns `GCA_000025685.1.gbk.gz` from `MEDIA_DATA_DIR/Archaea/unMAG/gbk/GCA_000025685.1.gbk.gz`.

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
  - File path: `MEDIA_DATA_DIR/<Microbe>/MAG/gff/<unique_id>.gff.gz` (for `mag`) or `MEDIA_DATA_DIR/<Microbe>/unMAG/gff/<unique_id>.gff.gz` (for `monoisolate`).
- **Content-Type**: `application/gzip`
- **Content-Disposition**: `attachment; filename="<unique_id>.gff.gz"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id` or missing file.

**Example**:

```
GET /api/download/gff?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1
```

Returns `GCA_000025685.1.gff.gz` from `MEDIA_DATA_DIR/Archaea/unMAG/gff/GCA_000025685.1.gff.gz`.

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

- `protein`: Protein annotations (pre-existing TSV).
- `rna`: tRNA annotations (generated CSV).
- `crispr`: CRISPR-Cas annotations (generated CSV, includes related CRISPR records).
- `anti`: Anti-CRISPR annotations (generated CSV).
- `sm`: Secondary metabolite regions (generated CSV).
- `sp`: Signal peptide predictions (generated CSV).
- `vf`: Virulence factors (generated CSV).
- `arg`: Antibiotic resistance genes (pre-existing TSV).
- `tmh`: Transmembrane helices (pre-existing TSV).

**Response**:

- **For `protein`, `arg`, `tmh`**:
  - A TSV file named `<microbe>_<type>_<annotation>_<unique_id>.tsv`.
  - File path: `NEW_MEDIA_DATA_DIR/<Microbe>/MAG/<annotation>s/<unique_id>.tsv` (for `mag`) or `NEW_MEDIA_DATA_DIR/<Microbe>/unMAG/<annotation>s/<unique_id>.tsv` (for `monoisolate`).
  - **Content-Type**: `text/tab-separated-values`
  - **Content-Disposition**: `attachment; filename="<microbe>_<type>_<annotation>_<unique_id>.tsv"`
- **For `rna`, `crispr`, `anti`, `sm`, `sp`, `vf`**:
  - A streaming CSV file named `<microbe>_<type>_<annotation>_<unique_id>.csv`.
  - Generated from database records using the respective `get_csv_header` and `to_csv_row` functions in the microbe’s view module (e.g., `archaea_views.tRNAs_views.get_csv_header`).
  - **Content-Type**: `text/csv`
  - **Content-Disposition**: `attachment; filename="<microbe>_<type>_<annotation>_<unique_id>.csv"`

**Errors**:

- **400 Bad Request**: Invalid `microbe`, `type`, `annotation`, or missing `unique_id`.
- **404 Not Found**: Non-existent `unique_id`, missing TSV file, or no records for generated annotations.
- **500 Internal Server Error**: Missing `get_csv_header` or `to_csv_row` methods in the view module.

**Examples**:

- Protein (TSV):

  ```
  GET /api/download/annotation?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1&annotation=protein
  ```

  Returns `archaea_monoisolate_protein_GCA_000025685.1.tsv` from `NEW_MEDIA_DATA_DIR/Archaea/unMAG/proteins/GCA_000025685.1.tsv`.

- Anti-CRISPR (CSV):

  ```
  GET /api/download/annotation?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1&annotation=anti
  ```

  Generates `archaea_monoisolate_anti_GCA_000025685.1.csv` from `UnMAGArchaeaAntiCRISPRAnnotation` records.

- CRISPR (CSV):

  ```
  GET /api/download/annotation?microbe=archaea&type=monoisolate&unique_id=GCA_000025685.1&annotation=crispr
  ```

  Generates `archaea_monoisolate_crispr_GCA_000025685.1.csv` from `UnMAGArchaeaCRISPRCas` and related `CRISPRs`.

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